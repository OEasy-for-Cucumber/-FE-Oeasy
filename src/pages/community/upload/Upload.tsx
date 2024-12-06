import imageCompression from "browser-image-compression";
import { useEffect, useState } from "react";
import uploadImg from "../../../../public/img/uploadImg.png";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../../api/axios";
import { useUserStore } from "../../../zustand/authStore";
import useAlert from "../../../hooks/useAlert";
import useConfirm from "../../../hooks/useConfirm";

function Upload() {
  const navigate = useNavigate();
  const location = useLocation();
  const postData = location.state;
  const [images, setImages] = useState<{ file?: File; url?: string }[]>([]);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState("");
  const user = useUserStore((state) => state.user);
  const { showAlert } = useAlert();
  const { showConfirm } = useConfirm();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (images.length + files.length > 6) {
      showAlert({
        message: "사진은 최대 6장까지 첨부 가능합니다"
      });
      return;
    }

    const compressedFiles: File[] = [];

    for (const file of files) {
      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1080,
          useWebWorker: true
        };

        const compressedBlob = await imageCompression(file, options);

        const convertedFile = new File([compressedBlob], file.name, {
          type: compressedBlob.type
        });

        compressedFiles.push(convertedFile);
      } catch (error) {
        console.error("이미지 압축 중 오류 발생:", error);
      }
    }

    setImages((prevImages) => [...prevImages, ...compressedFiles.map((file) => ({ file }))]);
  };

  const handleUploadClick = () => {
    document.getElementById("image-upload-input")?.click();
  };

  const handleDelClick = (index: number) => {
    showConfirm({
      message: "삭제하시겠습니까?",
      subMessage: "이 작업은 되돌릴 수 없습니다.",
      onConfirm: () => {
        const deletedImage = images[index];

        if (deletedImage?.url && !deleteList.includes(deletedImage.url)) {
          setDeleteList((prevDeleteList) => [...prevDeleteList, deletedImage.url as string]);
        }

        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages.splice(index, 1);
          return newImages;
        });
      }
    });
  };

  useEffect(() => {
    if (postData?.postData) {
      setTitle(postData.postData.title || "");
      setContent(postData.postData.content || "");
      if (postData.postData.imageUrlList) {
        setImages(postData.postData.imageUrlList.map((url: string) => ({ url })));
      }
    }
  }, [postData]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      showAlert({
        message: "제목을 입력해주세요."
      });
      return;
    }
    if (title.length > 70) {
      showAlert({
        message: "제목은 70자까지 작성 가능합니다."
      });
      return;
    }
    if (title.length > 70) {
      showAlert({
        message: "제목은 70자까지 작성 가능합니다."
      });
      return;
    }

    if (!content.trim()) {
      showAlert({
        message: "내용을 입력해주세요."
      });
      return;
    }
    if (content.length > 5000) {
      showAlert({
        message: "내용은 5000자 이내로 작성해주세요."
      });
      return;
    }

    const formData = new FormData();

    formData.append("userId", String(user?.memberPk));
    formData.append("title", title);
    formData.append("content", content);

    if (postData) {
      formData.append("communityId", String(postData.postData.id));
    }

    const hasFiles = images.some((image) => image.file);

    if (images.length === 0 || !hasFiles) {
      formData.append("imgList", null as unknown as string);
    } else {
      images.forEach((image) => {
        if (image.file) {
          formData.append("imgList", image.file);
        }
      });
    }

    deleteList.forEach((url) => {
      formData.append("deleteList", url);
    });

    try {
      if (postData) {
        const response = await instance.patch("/api/community", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        if (response.status === 200) {
          showAlert({ message: "게시물이 수정되었습니다." });
          navigate(`/community/detail/${postData.postData.id}`, { state: { cmnId: postData.postData.id } });
        } else {
          throw new Error("게시물 수정에 실패했습니다.");
        }
      } else {
        const response = await instance.post("/api/community", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        if (response.status === 200) {
          showAlert({ message: "게시물이 등록되었습니다." });
          navigate("/community");
        } else {
          throw new Error("게시물 등록에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
    return;
  };

  return (
    <>
      <div className="xl:w-[767px] mx-auto">
        <div className="flex justify-between py-4 px-6 xl:px-2">
          <p className="font-h5">글쓰기</p>
          <button
            className={`w-14 h-8 font-c2 rounded-[4px] px-3 py-2 ${
              title.trim() && content.trim() ? "bg-grayoe-400" : "bg-grayoe-800 text-grayoe-500 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!title.trim() || !content.trim()}
          >
            등록
          </button>
        </div>
        <div className="border-grayoe-900 border-4 w-full xl:hidden" />
        <div className="flex flex-col justify-center items-start font-b2-regular xl:font-b1-regular divide-y divide-grayoe-900">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-auto py-4 px-6 bg-grayoe-950 outline-none"
            placeholder="제목을 입력하세요."
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[240px] py-4 px-6 bg-grayoe-950 outline-none resize-none"
            placeholder="내용을 입력하세요."
          />
        </div>
        <div className="border-grayoe-900 border-4 xl:border-[1px] w-full" />
        <div className="px-6 py-4">
          <p className="font-b2-regular mb-2 xl:mb-4">이미지 첨부</p>
          <div className="grid grid-cols-4 gap-2  xl:grid-cols-7 xl:gap-2 ">
            <div
              className="min-w-[72px] min-h-[72px] max-w-[100px] max-h-[100px] rounded-lg flex justify-center items-center bg-grayoe-400 cursor-pointer aspect-square"
              onClick={handleUploadClick}
            >
              <img src={uploadImg} alt="이미지 첨부" className="w-6 h-6" />
            </div>
            <input
              id="image-upload-input"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            {images.map((image, index) => (
              <div
                key={index}
                className="min-w-[72px] min-h-[72px] max-w-[100px] max-h-[100px] rounded-lg cursor-pointer aspect-square"
                onClick={() => handleDelClick(index)}
              >
                <img
                  src={image.file ? URL.createObjectURL(image.file) : image.url}
                  alt="업로드된 이미지"
                  className="w-full rounded-lg h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Upload;
