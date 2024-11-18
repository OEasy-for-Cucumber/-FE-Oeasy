import { useRef, useState } from "react";
import uploadImg from "../../../../../public/img/uploadImg.png";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../../../zustand/authStore";

function Upload() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [images, setImages] = useState<string[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const user = useUserStore((state) => state.user);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const selectedImages = files.map((file) => URL.createObjectURL(file));
    if (images.length + selectedImages.length > 4) {
      alert("사진은 최대 4장까지 첨부 가능합니다");
      return;
    }

    setImages((prevImages) => [...prevImages, ...selectedImages]);
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

  const handleSubmit = () => {
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

    const now = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().split(".")[0];
    const postData = { postId, title, content, images, user, createdAt: now };
    console.log("등록된 데이터:", postData);
    alert("게시물이 등록되었습니다.");
    navigate(`/community/detail/${postId}`, { state: postData });
  };

  return (
    <>
      <div>
        <div className="flex justify-between py-4 px-6">
          <p className="font-h5">글쓰기</p>
          <button className="w-14 h-8 font-c2 rounded-[4px] bg-grayoe-400 px-3 py-2" onClick={handleSubmit}>
            등록
          </button>
        </div>
        <div className="border-grayoe-900 border-4 w-full xl:hidden" />
        <div className="flex flex-col justify-center items-start font-b2-regular">
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
        <div className="border-grayoe-900 border-4 w-full xl:hidden" />
        <div className="px-6 py-4">
          <p className="font-b2-regular mb-2">이미지 첨부</p>
          <div className="grid grid-cols-4 gap-2">
            <div
              className="min-w-[72px] min-h-[72px] max-w-[112px] max-h-[112px] rounded-lg flex justify-center items-center bg-grayoe-400 cursor-pointer aspect-square"
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
            {images.map((src, index) => (
              <div
                key={index}
                className="min-w-[72px] min-h-[72px] max-w-[112px] max-h-[112px] rounded-lg cursor-pointer"
                onClick={() => handleDelClick(index)}
              >
                <img src={src} alt="업로드된 이미지" className="w-full rounded-lg h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Upload;
