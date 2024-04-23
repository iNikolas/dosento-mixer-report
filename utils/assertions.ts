import { User } from "@/entities";

export function assertIsUser(record: unknown): asserts record is User {
  if (
    typeof record !== "object" ||
    record === null ||
    typeof (record as User).uid !== "string" ||
    typeof (record as User).emailVerified !== "boolean" ||
    typeof (record as User).email !== "string" ||
    typeof (record as User).displayName !== "string"
  ) {
    throw new Error("Provided input is not a UserRecord");
  }
}
