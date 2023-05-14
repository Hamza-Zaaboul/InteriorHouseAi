const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    location: "Toronto, Canada",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    location: "Toronto, Canada",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    location: "Toronto, Canada",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    location: "Toronto, Canada",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    location: "Toronto, Canada",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    location: "Toronto, Canada",
  },
  // More people...
];

const people2 = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    location: "Toronto, Canada",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    location: "Toronto, Canada",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    location: "Toronto, Canada",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    location: "Toronto, Canada",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    location: "Toronto, Canada",
  },
  // More people...
];

export default function Galerie() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center mb-14">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Aperçus
          </h2>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mt-2 ">
            Simplicité et fiabilité
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-100">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error officiis et nobis, officia deserunt itaque sapiente magnam, quam quo accusantium labore quis
          </p>
        </div>
        <div className="flex flex-col gap-14 md:flex-row">
          <div className="w-full flex flex-col items-start justify-center">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-2xl">
                Photos d'entrée
              </h3>
            </div>
            <div className="flex justify-start gap-x-4">
              <ul
                role="list"
                className="mt-4 gap-x-2 sm:gap-x-4 text-center lg:mx-0 flex w-[100%] sm:w-[75%] h-auto"
              >
                {people2.map((person) => (
                  <li key={person.name} className="m-0">
                    <img
                      className=" w-[100%] rounded-md"
                      src={person.imageUrl}
                      alt=""
                    />
                  </li>
                ))}
              </ul>

              <img
                src="../../left-arrow.svg"
                alt=""
                className="w-14 md:w-24 rotate-[50deg]"
              />
            </div>

            <ul
              role="list"
              className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-x-3 gap-y-4 sm:gap-x-8 sm:gap-y-12  sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-3"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <img
                    className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
                    src={person.imageUrl}
                    alt=""
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full flex flex-col items-end justify-center">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-2xl">
                Photos d'entrée
              </h3>
            </div>
            <div className="flex justify-end gap-x-4">
              <img
                src="../../right-arrow.svg"
                alt=""
                className="w-14  md:w-24 rotate-[-50deg]"
              />

              <ul
                role="list"
                className="mt-4 gap-x-2 sm:gap-x-4 text-center lg:mx-0 flex w-[100%] sm:w-[75%] h-auto"
              >
                {people2.map((person) => (
                  <li key={person.name} className="m-0">
                    <img
                      className=" w-[100%] rounded-md"
                      src={person.imageUrl}
                      alt=""
                    />
                  </li>
                ))}
              </ul>
            </div>
            <ul
              role="list"
              className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-x-3 gap-y-4 sm:gap-x-8 sm:gap-y-12 sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-3"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <img
                    className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
                    src={person.imageUrl}
                    alt=""
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
