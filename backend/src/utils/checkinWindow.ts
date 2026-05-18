export const validateQuarterWindow =
  (quarter: string) => {
    const month =
      new Date().getMonth() + 1;

    const validWindows: any = {
      Q1: [7],
      Q2: [10],
      Q3: [1],
      Q4: [3, 4],
    };

    const allowedMonths =
      validWindows[quarter];

    if (!allowedMonths) {
      throw new Error(
        "Invalid quarter"
      );
    }

    if (
      !allowedMonths.includes(
        month
      )
    ) {
      throw new Error(
        `Check-in window closed for ${quarter}`
      );
    }
  };