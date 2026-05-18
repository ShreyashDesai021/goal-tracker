import {
  useEffect,
  useState,
} from "react";

type Props = {
  title: string;
  value: number;
  icon?: React.ReactNode;
  roleColor?: string;
};

function StatCard({
  title,
  value,
  icon,
  roleColor =
    "indigo",
}: Props) {

  const [
    animatedValue,
    setAnimatedValue,
  ] = useState(0);

  useEffect(() => {

    let start = 0;

    const duration =
      900;

    const increment =
      value /
      (
        duration / 16
      );

    const timer =
      setInterval(() => {

        start +=
          increment;

        if (
          start >=
          value
        ) {

          setAnimatedValue(
            value
          );

          clearInterval(
            timer
          );

        } else {

          setAnimatedValue(
            Math.floor(
              start
            )
          );
        }
      }, 16);

    return () =>
      clearInterval(
        timer
      );

  }, [value]);

  return (
    <div className="bg-white rounded-[32px] p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-slate-100">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-slate-500 font-medium">
            {title}
          </p>

          <h2 className="text-5xl font-bold text-slate-900 mt-4">
            {
              animatedValue
            }
          </h2>

        </div>

        {icon && (
          <div
            className={`bg-${roleColor}-100 p-4 rounded-2xl`}
          >
            {icon}
          </div>
        )}

      </div>

    </div>
  );
}

export default StatCard;