const Card = ({ item }) => {
  return (
    <div className="w-[85vw] sm:w-[38vw] md:w-[38vw] lg:w-[24vw] h-[58vh] sm:h-[43vh] md:h-[40vh] lg:h-[55vh] shadow-[4px__4px_12px_1px_rgba(0,0,0,0.25)] overflow-hidden rounded-xl md:rounded-2xl hover:border-2 hover:border-[darkgray]">
      <div className="flex flex-col overflow-hidden mb-3">
        <div className="mb-2 overflow-hidden">
          <img src={item.photo} className="w-[100vw] h-[40vh] sm:h-[28vh] lg:h-[39vh] hover:scale-110 hover:duration-500" />
        </div>
        <div className="my-1 mx-2 flex flex-col gap-2 lg:my-0 lg:text-[15px]">
          <h1 className="text-[20px] font-bold capitalize">{item.name}</h1>
          <p className="truncate">
            {item.address}, {item.city}
          </p>
          <p>{item.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
