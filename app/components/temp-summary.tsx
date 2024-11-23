import { montserrat } from "../fonts/fonts";
import { openSans } from "../fonts/fonts";

interface Props {
    temperature: number;
    description: string;
    detailedForecast: string;
}

const TemperatureSummary = ({
    temperature,
    description,
    detailedForecast,
}: Props) => {
    return (
        <div className="flex items-center justify-center mt-20 mb-[3rem]">
            <div className="w-96 text-center relative">
                <div className="relative">
                    <span className="rounded-full h-[16rem] w-[16rem] bg-[#FFB405] absolute z-0 left-[6rem] top-0" />
                    {/* <svg
                        viewBox="0 0 16 16"
                        className="h-[16rem] w-[16rem] absolute z-0 left-[6rem] top-0 fill-[#FFB405]"
                    >
                        <path d="m 6.816406 1.011719 c -3.308594 0.570312 -5.839844 3.472656 -5.839844 6.941406 c 0 3.871094 3.160157 7.046875 7.023438 7.046875 c 1.753906 0 3.367188 -0.660156 4.597656 -1.734375 c 0.605469 -0.527344 0.371094 -1.515625 -0.40625 -1.722656 c -2.8125 -0.734375 -4.914062 -3.304688 -4.914062 -6.367188 c 0 -0.984375 0.222656 -1.910156 0.613281 -2.757812 c 0.339844 -0.730469 -0.28125 -1.539063 -1.074219 -1.40625 z m 0 0" />
                    </svg> */}
                    <p
                        className={`${montserrat.className} text-[13rem] font-extralight antialiased z-10 relative`}
                    >
                        {temperature}°
                    </p>
                </div>
                <p
                    className={`${openSans.className} top-[-1rem] relative font-semibold`}
                >
                    {description}
                </p>
                <p className={`${openSans.className} text-sm`}>
                    {detailedForecast}
                </p>
            </div>
        </div>
    );
};

export default TemperatureSummary;
