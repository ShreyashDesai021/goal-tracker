import { z } from "zod";

export const goalSchema = z.object({
  goals: z
    .array(
      z.object({
        thrustArea: z.string({
          message:
            "Thrust area is required",
        }),

        title: z.string({
          message:
            "Title is required",
        }),

        description: z.string({
          message:
            "Description is required",
        }),

        uomType: z.enum([
          "NUMERIC",
          "PERCENTAGE",
          "TIMELINE",
          "ZERO_BASED",
        ]),

        target: z.number({
          message:
            "Target is required",
        }),

        weightage: z
          .number()
          .min(
            10,
            {
              message:
                "Each goal must have minimum 10% weightage",
            }
          ),
      })
    )
    .max(8, {
      message:
        "Maximum 8 goals allowed",
    }),
});