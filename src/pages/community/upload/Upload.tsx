import imageCompression from "browser-image-compression";
import { useRef, useState } from "react";
import uploadImg from "../../../../public/img/uploadImg.png";
import { useNavigate } from "react-router-dom";

import instance from "../../../api/axios";
import { useUserStore } from "../../../zustand/authStore";

function Upload() {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
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

    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...compressedFiles];
      console.log("업데이트된 images 배열:", updatedImages);
      return updatedImages;
    });
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

    if (images.length === 0) {
      console.warn("이미지가 업로드되지 않았습니다.");
    }
    images.forEach((image, index) => {
      formData.append(`imgList[${index}]`, image);
    });
    try {
      const response = await instance.post("/api/community", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log("서버 응답 데이터:", response.data);

      if (response.status === 200) {
        alert("게시물이 등록되었습니다.");
        navigate("/community");
      } else {
        throw new Error("게시물 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시물 등록 중 오류 발생:", error);
      alert("게시물 등록에 실패했습니다. 다시 시도해주세요.");
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
            {images.map((file, index) => (
              <div
                key={index}
                className="min-w-[72px] min-h-[72px] max-w-[100px] max-h-[100px] rounded-lg cursor-pointer aspect-square"
                onClick={() => handleDelClick(index)}
              >
                <img
                  src={URL.createObjectURL(file)}
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