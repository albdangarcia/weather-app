// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

const loading = () => {
    return (
        <div className="absolute top-7 left-0 w-full h-full">
            <div className="flex items-center justify-center flex-col mt-5 mb-[3rem]">
                {/* date */}
                <p className={`${shimmer} relative overflow-hidden h-5 w-16 bg-slate-200 mb-0.5 rounded`} />
                {/* location */}
                <div className="bg-black w-36 h-8 rounded flex items-center justify-center">
                    <p className={`${shimmer} relative overflow-hidden bg-slate-700 rounded h-4 w-28`} />
                </div>
                {/* main temp */}
                <div className={`${shimmer} relative overflow-hidden mt-20 mb-[2.7rem] w-80 bg-slate-200 h-[16rem] rounded`} />
                <div className={`${shimmer} relative overflow-hidden w-40 h-6 bg-slate-200 rounded mb-6`} />
                {/* short description */}
                <div>
                    <div className={`${shimmer} relative overflow-hidden h-2 mb-1 w-80 bg-slate-200 rounded mx-auto`} />
                    <div className={`${shimmer} relative overflow-hidden h-2 mb-1 w-72 bg-slate-200 rounded mx-auto`} />
                    <div className={`${shimmer} relative overflow-hidden h-2 w-64 bg-slate-200 rounded mx-auto`} />
                </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 w-[24rem] md:w-[48rem] mx-auto gap-y-6">
                {/* left column */}
                <div className="grid grid-cols-1 gap-y-6">
                    {/* hourly temps */}
                    <div className="grid grid-cols-6 gap-x-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center"
                            >
                                <div className={`${shimmer} relative overflow-hidden bg-slate-200 h-3 w-full rounded`} />
                                <div className={`${shimmer} relative overflow-hidden bg-slate-200 h-6 w-6 mt-2 rounded-full`} />
                                <div className={`${shimmer} relative overflow-hidden bg-slate-200 h-3 w-6 mt-1 rounded`} />
                            </div>
                        ))}
                    </div>
                    {/* forecast observations */}
                    <div className="bg-black h-[7.8rem] mt-1 md:mt-4 rounded grid grid-cols-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-center space-y-1 text-sm"
                            >
                                <div className={`${shimmer} relative overflow-hidden bg-slate-700 h-6 w-6 rounded-full mb-2`} />
                                <div className={`${shimmer} relative overflow-hidden bg-slate-700 h-3 w-16 rounded`} />
                                <div className={`${shimmer} relative overflow-hidden bg-slate-700 h-3 w-16 rounded`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* right column */}
                <div className="w-48 mx-auto">
                    {/* daily forecast */}
                    <h1 className="border-b border-black mb-2">
                        {/* Daily Forecast */}
                        <div className={`${shimmer} relative overflow-hidden bg-slate-200 mb-2 h-6 w-28 rounded`} />
                    </h1>
                    <div className="grid gap-y-1">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-3 justify-between"
                            >
                                <div className={`${shimmer} relative overflow-hidden bg-slate-200 h-4 w-16 rounded`} />
                                <div className={`${shimmer} relative overflow-hidden bg-slate-200 h-6 w-6 mx-auto rounded-full`} />
                                <div className="flex space-x-2 justify-center">
                                    <div className={`${shimmer} relative overflow-hidden bg-slate-200 h-4 w-12 rounded`} />
                                    <div className={`${shimmer} relative overflow-hidden bg-slate-200 h-4 w-12 rounded`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default loading;
