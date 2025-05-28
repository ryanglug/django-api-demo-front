import { Fragment } from "react/jsx-runtime";

interface Props {
  array: string[];
}

const ImageMap = ({ array }: Props) => {
  return (
    <>
      {array.map((img, i) => {
        const isLast = i + 1 === array.length;
        if (isLast) {
          return (
            <Fragment key={`image-map-${i}`}>
              <img src={img} className="size-20" />
            </Fragment>
          );
        } else {
          return (
            <Fragment key={`image-map-${i}`}>
              <img src={img} className="size-20" />
              <span>+</span>
            </Fragment>
          );
        }
      })}
    </>
  );
};

export default ImageMap;
