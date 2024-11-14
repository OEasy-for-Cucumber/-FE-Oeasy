import { useState } from "react";
import uploadImg from "../../../../../public/img/uploadImg.png";

function Upload() {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const selectedImges = files.map((file) => URL.createObjectURL(file));
    if (images.length + selectedImges.length > 4) {
      alert("사진은 최대 4장까지 첨부 가능합니다");
      return;
    }

    setImages((prevImages) => [...prevImages, ...selectedImges]);
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

  return (
    <>
      <div>
        <div className="flex justify-between py-4 px-6">
          <p className="font-h5">글쓰기</p>
          <button className="w-14 h-8 font-c2 rounded-[4px] bg-grayoe-400 px-3 py-2">등록</button>
        </div>
        <div className="border-grayoe-900 border-4 w-full xl:hidden" />
        <div className="flex flex-col justify-center items-start font-b2-regular">
          <textarea className="w-full h-auto py-4 px-6 bg-grayoe-950 outline-none" placeholder="제목을 입력하세요." />
          <textarea
            className="w-full min-h-[240px] py-4 px-6 bg-grayoe-950 outline-none"
            placeholder="내용을 입력하세요."
          />
        </div>
        <div className="border-grayoe-900 border-4 w-full xl:hidden" />
        <div className="px-6 py-4">
          <p className="font-b2-regular mb-2">이미지 첨부</p>

          <div className="grid grid-cols-4 gap-2">
            <div
              className="min-w-[72px] min-h-[72px] max-w-[112px] max-h-[112px] rounded-lg flex justify-center items-center bg-grayoe-400 cursor-pointer"
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
