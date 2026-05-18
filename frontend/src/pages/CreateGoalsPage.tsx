import {
  useForm,
  useFieldArray,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  createGoals,
} from "../api/goalApi";

import {
  useNavigate,
} from "react-router-dom";

import {
  goalSchema,
} from "../utils/goalSchema";

import type {
  GoalFormData,
} from "../utils/goalSchema";

function CreateGoalsPage() {

  const navigate =
    useNavigate();

  const {
    register,
    control,
    handleSubmit,
  } =
    useForm<GoalFormData>({
      resolver:
        zodResolver(
          goalSchema
        ),

      defaultValues: {
        goals: [
          {
            thrustArea: "",
            title: "",
            description: "",
            uomType:
              "NUMERIC",
            target: 0,
            weightage: 10,
          },
        ],
      },
    });

  const {
    fields,
    append,
    remove,
  } =
    useFieldArray({
      control,
      name: "goals",
    });

  const onSubmit =
    async (
      data:
      GoalFormData
    ) => {

      try {

        await createGoals(
          data
        );

        alert(
          "Goals Created!"
        );

        navigate(
          "/my-goals"
        );

      } catch (
        error: any
      ) {

        alert(
          error.response
          ?.data
          ?.message
        );
      }
    };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Create Goals
      </h1>

      <form
        onSubmit={
          handleSubmit(
            onSubmit
          )
        }
        className="space-y-6"
      >

        {fields.map(
          (field, index) => (

          <div
            key={field.id}
            className="bg-white rounded-2xl p-6 shadow-md space-y-4"
          >

            <h2 className="font-bold text-lg">
              Goal {index + 1}
            </h2>

            <input
              placeholder="Thrust Area"
              {...register(
                `goals.${index}.thrustArea`
              )}
              className="w-full border p-3 rounded-lg"
            />

            <input
              placeholder="Title"
              {...register(
                `goals.${index}.title`
              )}
              className="w-full border p-3 rounded-lg"
            />

            <input
              placeholder="Description"
              {...register(
                `goals.${index}.description`
              )}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Target"
              {...register(
                `goals.${index}.target`,
                {
                  valueAsNumber:
                    true,
                }
              )}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Weightage"
              {...register(
                `goals.${index}.weightage`,
                {
                  valueAsNumber:
                    true,
                }
              )}
              className="w-full border p-3 rounded-lg"
            />

            <select
              {...register(
                `goals.${index}.uomType`
              )}
              className="w-full border p-3 rounded-lg"
            >
              <option value="NUMERIC">
                Numeric
              </option>

              <option value="PERCENTAGE">
                Percentage
              </option>

              <option value="TIMELINE">
                Timeline
              </option>

              <option value="ZERO_BASED">
                Zero Based
              </option>
            </select>

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  remove(index)
                }
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            )}

          </div>
        ))}

        <div className="flex gap-4">

          <button
            type="button"
            onClick={() =>
              append({
                thrustArea: "",
                title: "",
                description: "",
                uomType:
                  "NUMERIC",
                target: 0,
                weightage: 10,
              })
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add Goal
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Submit Goals
          </button>

        </div>

      </form>
    </div>
  );
}

export default CreateGoalsPage;