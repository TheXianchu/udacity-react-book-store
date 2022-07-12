import PropTypes from "prop-types";

export default function BookCover({ width, height, thumbnail }) {
	return (
		<div
			className="book-cover"
			style={{
				width: width,
				height: height,
				backgroundImage: `url(${thumbnail})`,
			}}></div>
	);
}

BookCover.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	thumbnail: PropTypes.string.isRequired,
};
