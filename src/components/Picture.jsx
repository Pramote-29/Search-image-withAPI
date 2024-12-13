const Picture = (props) => {
  return (
    <>
      <img
        className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-2xl"
        src={props.urls.small}
        alt={props.description}
      />
    </>
  );
};
export default Picture;
