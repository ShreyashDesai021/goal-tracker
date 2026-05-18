import { z } from "zod";

export const goalSchema =
  z.object({
    goals:
      z.array(
        z.object({
          thrustArea:
            z.string()
              .min(1),

          title:
            z.string()
              .min(1),

          description:
            z.string()
              .min(1),

          uomType:
            z.enum([
              "NUMERIC",
              "PERCENTAGE",
              "TIMELINE",
              "ZERO_BASED",
            ]),

          target:
            z.number(),

          weightage:
            z.number()
              .min(
                10,
                "Minimum 10% weightage"
              ),
        })
      )
      .max(
        8,
        "Maximum 8 goals allowed"
      ),
  });

export type GoalFormData =
  z.infer<
    typeof goalSchema
  >;