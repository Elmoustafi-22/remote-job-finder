export default function Hero(){
    return (
      <section
        className="bg-cover bg-top bg-no-repeat bg-opacity-70"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-photo/workplace-with-smartphone-laptop-black-table-top-view-copyspace-background_144627-24860.jpg?t=st=1728678951~exp=1728682551~hmac=0988ea8419d64a27fbdaebf5c009f0c1d2a112c89173f246a1bb4bc6593161e2&w=996)",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <div className="container py-44 mt-10">
          <h1 className="text-4xl font-bold text-center justify-center items-center text-yellow-50">
            Find your next
            <br /> remote job
          </h1>
          <form className="flex gap-2 mt-4 max-w-md mx-auto">
            <input
              type="search"
              className="border border-gray-400 w-full py-2 px-3 rounded-md outline-gray-100"
              placeholder="Search phrase..."
            />
            <button className="bg-violet-800 text-white py-1 px-4 rounded-md shadow-lg hover:bg-violet-700 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
                ></path>
              </svg>
            </button>
          </form>
        </div>
      </section>
    );
}