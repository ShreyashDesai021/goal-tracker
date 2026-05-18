type Props = {
  title: string;
  value: number;
};

function StatCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">

      <h2 className="text-gray-500 text-sm capitalize">
        {title}
      </h2>

      <p className="text-3xl font-bold mt-2 text-slate-800">
        {value}
      </p>

    </div>
  );
}

export default StatCard;