const Card = ({ item }) => {
  return (
    <div className="shadow-[4px__4px_12px_1px_rgba(0,0,0,0.25)] overflow-hidden rounded-xl md:rounded-2xl">
      <div className="flex flex-col overflow-hidden mb-3">
        <div className="mb-2 overflow-hidden">
          <img src={item.photo} className="w-[300px] h-[200px] md:h-[200px] md:w-[300px] sm:w-[350px] sm:h-[230px] hover:scale-110 lg:h-[200px] lg:w-[300px]" />
        </div>
        <div className="my-1 mx-2 flex flex-col gap-2 lg:my-0 lg:text-[15px]">
          <h1 className="text-[20px] font-bold">{item.name}</h1>
          <p>
            {item.address}, {item.city}
          </p>
          <p>{item.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
