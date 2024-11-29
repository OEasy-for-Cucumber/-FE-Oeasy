import imageCompression from "browser-image-compression";
import { useEffect, useRef, useState } from "react";
import uploadImg from "../../../../public/img/uploadImg.png";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../../api/axios";
import { useUserStore } from "../../../zustand/authStore";

function Upload() {
  const navigate = useNavigate();
  const location = useLocation();
  const postData = location.state;
  const [images, setImages] = useState<{ file?: File; url?: string }[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const user = useUserStore((state) => state.user);

  console.log(user);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (images.length + files.length > 6) {
      alert("사진은 최대 6장까지 첨부 가능합니다");
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

        // Blob을 File로 변환
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
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (confirmDelete) {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };

  console.log(postData);

  useEffect(() => {
    if (postData && postData.postData && titleRef.current && contentRef.current) {
      titleRef.current.value = postData.postData.title || "";
      contentRef.current.value = postData.postData.content || "";

      if (postData.postData.imageUrlList) {
        setImages(postData.postData.imageUrlList.map((url: string) => ({ url }))); // URL만 상태에 저장
      }
    }
  }, [postData]);

  const handleSubmit = async () => {
    const title = titleRef.current?.value || "";
    const content = contentRef.current?.value || "";

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    const formData = new FormData();

    formData.append("userId", String(user?.memberPk));
    formData.append("title", title);
    formData.append("content", content);

    if (postData) {
      formData.append("communityId", String(postData.postData.id));
    }

    if (images.length > 0) {
      images.forEach((image, index) => {
        if (image.file) {
          // 파일을 formData에 추가
          formData.append(`imgList[${index}]`, image.file);
        } else if (image.url) {
          // URL은 별도 처리
          formData.append(`imgList[${index}]`, image.url);
        }
      });
    }

    try {
      if (postData) {
        // 수정 요청
        const response = await instance.patch("/api/community/", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        if (response.status === 200) {
          alert("게시물이 수정되었습니다.");
          navigate(`/detail/${postData.id}`);
        } else {
          throw new Error("게시물 수정에 실패했습니다.");
        }
      } else {
        // 새 글 작성 요청
        const response = await instance.post("/api/community", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        if (response.status === 200) {
          alert("게시물이 등록되었습니다.");
          navigate("/community");
        } else {
          throw new Error("게시물 등록에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("오류 발생:", error);
      alert("작업 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="xl:w-[767px] mx-auto">
        <div className="flex justify-between py-4 px-6 xl:px-2">
          <p className="font-h5">글쓰기</p>
          <button className="w-14 h-8 font-c2 rounded-[4px] bg-grayoe-400 px-3 py-2" onClick={handleSubmit}>
            등록
          </button>
        </div>
        <div className="border-grayoe-900 border-4 w-full xl:hidden" />
        <div className="flex flex-col justify-center items-start font-b2-regular xl:font-b1-regular divide-y divide-grayoe-900">
          <input
            ref={titleRef}
            className="w-full h-auto py-4 px-6 bg-grayoe-950 outline-none"
            placeholder="제목을 입력하세요."
          />
          <textarea
            ref={contentRef}
            className="w-full min-h-[240px] py-4 px-6 bg-grayoe-950 outline-none"
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
                  src={image.file ? URL.createObjectURL(image.file) : image.url} // file과 url 구분
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
