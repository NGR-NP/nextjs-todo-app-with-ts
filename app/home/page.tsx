import NavBar from "../components/NavBar";
import Lists from "./Lists";

const page = () => {
  const data = {
    firstName: "Tej",
    lastName: "karki",
    img: "https://tejbahadurkarki.com.np/static/media/tej1.7974611c688e1b32cc4b.jpg",
  };
  const categories = [
    {
      _id: "1",
      name: "business",
      tasks: 100,
    },
    {
      _id: "2",
      name: "personal",
      tasks: 5,
    },
    {
      _id: "3",
      name: "other",
      tasks: 40,
    },
    {
      _id: "4",
      name: "test",
      tasks: 10,
    },
  ];
  const totalTask = categories.reduce((acc, item) => {
    return acc + item?.tasks;
  }, 0);
  const todos = [
    { task: "Daily meeting with team 1", date: "2023-01-03", catg: "personal" },
    { task: "Daily meeting with team 2", date: "2023-04-03", catg: "business" },
    { task: "Daily meeting with team 3", date: "2023-03-03", catg: "personal" },
    { task: "Daily meeting with team 4", date: "2023-04-03", catg: "other" },
    { task: "Daily meeting with team 5", date: "2023-02-03", catg: "personal" },
    { task: "Daily meeting with team 6", date: "2023-04-03", catg: "business" },
    { task: "Daily meeting with team 7", date: "2023-05-03", catg: "personal" },
    { task: "Daily meeting with team 8", date: "2023-05-03", catg: "personal" },
    { task: "Daily meeting with team 9", date: "2023-05-03", catg: "personal" },
    {
      task: "Daily meeting with team 10",
      date: "2023-05-03",
      catg: "personal",
    },
    {
      task: "Daily meeting with team 11",
      date: "2023-05-03",
      catg: "personal",
    },
    {
      task: "Daily meeting with team 12",
      date: "2023-05-03",
      catg: "personal",
    },
    {
      task: "Daily meeting with team 13",
      date: "2023-05-03",
      catg: "personal",
    },
    {
      task: "Daily meeting with team 14",
      date: "2023-05-03",
      catg: "personal",
    },
    {
      task: "Daily meeting with team 15",
      date: "2023-05-03",
      catg: "personal",
    },
  ];
  const color = [
    { catg: "personal", bg: "rgb(59 130 246 /1)", text: "rgb(37 99 235 /1)" },
    {
      catg: "business",
      bg: "rgb(232 121 249 / 1)",
      text: " rgb(240 171 252 / 1 )",
    },
  ];
  return (
    <>
      <NavBar firstName={data?.firstName} img={data?.img} lastName={data?.lastName} />
      <main className="overflow-x-hidden  md:pt-8 bg-slate-100">
        <div className="">
          <section className="px-8 pt-8 pb-4">
            <h1 className="text-3xl font-bold font-raleway text-slate-700">
              What's up, {data?.firstName}!
            </h1>
          </section>
          <section className="overflow-hidden w-screen">
            <div className="px-8 py-4 font-bold tracking-widest font-title text-slate-400">
              CATEGORIES
            </div>
            <div className="relative">
              <div
                className="absolute top-0 -left-6 z-30 w-12 h-full blur-md"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(240,241,241,1) 69%, rgba(240,241,241,1) 100%)",
                }}
              />
              <div className="flex overflow-x-scroll gap-4 pl-8 mb-4 duration-300 last:mr-16 scroll-smooth">
                {categories.map((item) => {
                  const persentage = (item.tasks * 100) / totalTask;
                  return (
                    <div className="last:mr-8">
                      <div
                        key={item._id}
                        className="px-4 py-5 rounded-xl bg-white/95"
                      >
                        <div className="w-48 font-title sm:w-56 text-slate-400">
                          {item.tasks} tasks
                        </div>
                        <div className="py-1 font-bold font-title backdrop-blur-0">
                          {item.name}
                        </div>
                        <div className="mt-4 w-full h-1 bg-slate-200">
                          <div
                            style={{ width: `${persentage.toFixed(2)}%` }}
                            className={`${item.name === "business"
                                ? "bg-blue-500"
                                : item.name === "personal"
                                  ? "bg-fuchsia-500"
                                  : item.name === "other"
                                    ? "bg-yellow-400"
                                    : "bg-gray-400"
                              } w-0 h-1  duration-[800ms]`}
                          />
                        </div>
                        <p className="mt-1 font-title">
                          {persentage.toFixed(2)} %
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                className="absolute top-0 -right-6 z-30 w-12 h-full blur-md"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(240,241,241,1) 69%, rgba(240,241,241,1) 100%)",
                }}
              />
            </div>
          </section>
          <section className="pb-8">
            <div className="px-8 py-4 font-bold tracking-widest font-title text-slate-400">
              TODAY'S TASKS
            </div>
            <div>
              <div className="flex flex-col gap-2 justify-center items-center pl-8 mb-4 duration-300 scroll-smooth last:pr-10">
                {todos.map((todo, idx) => {
                  const { task, date, catg } = todo;
                  const clr = color.map((c) => c?.catg == todo?.catg);
                  return (
                    <Lists idx={idx} date={date} catg={catg} task={task} />
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default page;
