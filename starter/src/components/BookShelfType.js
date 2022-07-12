export const CURRENTLY_READING = "currentlyReading";
export const WANT_TO_READ = "wantToRead";
export const READ = "read";
export const SEARCH = "search";

export function getDefaultLabel(type) {
  switch (type) {
    case CURRENTLY_READING:
      return "Currently Reading";
    case WANT_TO_READ:
      return "Want To Read";
    case READ:
      return "Read";
    case SEARCH:
      return "Search results";
  }
}
