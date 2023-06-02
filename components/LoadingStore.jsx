export default function LoadingStore() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="   loadering">
          <span className="inline-flex items-center gap-x-0.5 rounded-md  px-2 py-1 text-2xl font-semibold text-gray-900">
            CHARGEMENT EN COURS <span className="bullets">.</span>
          </span>
        </div>
        <div className="boxes">
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>{" "}
      </div>
    </>
  );
}
