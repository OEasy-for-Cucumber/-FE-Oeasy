import LocationIcon from "../../../public/icons/Location.png"

function OEIndex() {
  return (
    <div>
        <h3 className="font-h3">오늘의 OE지수</h3>
        <div className="flex gap-2 items-center py-1">
            <img src={LocationIcon} alt="locationIcon" />
            <p className="font-b2-regular">중구 황학동</p>
            <p className="font-c2 text-grayoe-300">02:00 PM 기준</p>
        </div>

        <div className="">
        <p className="text-[72px] font-bold text-greenoe-600">28°</p>
        <div className="flex text-grayoe-100 gap-3">
            <p>18</p>
            <p className="text-gray-600">-------</p>
            <p>28</p>
        </div>
        </div> 
    </div>
  )
}

export default OEIndex