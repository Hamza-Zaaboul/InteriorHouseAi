export default function Exemple({ listImageExemple }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-4 md:py-8 w-full">
        <div>
          {listImageExemple.map((item) => (
            <div key={item.id} className=" mt-16 md:mt-2">
              <div className="mx-auto mt-6 md:mt-8 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 lg:mx-0 lg:max-w-none">
                <div className="relative  w-full">
                  <label htmlFor={item.id} className="w-full">
                    <img
                      className="aspect-[3/2] w-full rounded-2xl object-cover"
                      src={item.before}
                      alt=""
                    />
                  </label>

                  <span className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      Avant
                    </span>
                  </span>

    


                </div>

                <div className="relative w-full">
                  <label htmlFor={item.id} className="w-full">
                    <img
                      className="aspect-[3/2] w-full rounded-2xl object-cover"
                      src={item.after}
                      alt=""
                    />
                  </label>

                  <span className="absolute top-2 right-2">
                    {" "}
                    <span className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      Apres
                    </span>
                  </span>

                  <span className="absolute bottom-2 left-2">
                    <span className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                    {item.theme}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-56"></div>
      </div>
    </>
  );
}
