function validateInterviewTest(data) {
  const errors = [];

  if (data.field_1) {
    try {
      JSON.stringify(data.field_1);
    } catch {
      errors.push("field_1 must be valid JSON");
    }
  }

  if (data.field_2 != null && typeof data.field_2 !== "number") {
    errors.push("field_2 must be numeric");
  }

  if (data.field_3 != null && typeof data.field_3 !== "boolean") {
    errors.push("field_3 must be boolean");
  }

  return errors;
}

module.exports = validateInterviewTest;
