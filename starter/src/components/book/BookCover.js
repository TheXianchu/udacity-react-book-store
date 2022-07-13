import PropTypes from "prop-types";

export default function BookCover({ imageLinks }) {
  return (
    <div
      className="book-cover"
      style={{
        width: 125,
        height: 190,
        backgroundImage: `url(${imageLinks.smallThumbnail})`,
      }}
    ></div>
  );
}

BookCover.propTypes = {
  imageLinks: PropTypes.object.isRequired,
};
