export default function PlaylistCover({ images = [] }) {
  const imgs = images.slice(0, 4);

  // 1 IMAGE
  if (imgs.length === 1) {
    return (
      <img
        src={imgs[0]}
        className="w-full h-full object-cover rounded-xl"
      />
    );
  }

  // 2 IMAGES
  if (imgs.length === 2) {
    return (
      <div className="grid grid-cols-2 h-full w-full rounded-xl overflow-hidden">
        {imgs.map((img, i) => (
          <img key={i} src={img} className="w-full h-full object-cover" />
        ))}
      </div>
    );
  }

  // 3 IMAGES (🔥 special layout)
  if (imgs.length === 3) {
    return (
      <div className="grid grid-cols-2 grid-rows-2 h-full w-full rounded-xl overflow-hidden">
        <img
          src={imgs[0]}
          className="col-span-2 row-span-1 object-cover w-full h-full"
        />
        <img src={imgs[1]} className="object-cover w-full h-full" />
        <img src={imgs[2]} className="object-cover w-full h-full" />
      </div>
    );
  }

  // 4 IMAGES
  return (
    <div className="grid grid-cols-2 grid-rows-2 h-full w-full rounded-xl overflow-hidden">
      {imgs.map((img, i) => (
        <img key={i} src={img} className="object-cover w-full h-full" />
      ))}
    </div>
  );
}
