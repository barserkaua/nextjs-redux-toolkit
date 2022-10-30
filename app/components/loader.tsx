const Loader = () => {
  return (
    <div className="fixed top-[50%] left-[50%] z-50">
      <div className="h-20 w-20 rounded-full border-2 border-blue-200"></div>
      <div className="absolute left-0 top-0 h-20 w-20 animate-spin rounded-full border-t-2 border-blue-700"></div>
    </div>
  );
};

export default Loader;
