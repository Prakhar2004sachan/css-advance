const container = document.querySelector("#image-container");

window.onmousedown = (e) => {
  container.dataset.mouseDownAt = e.clientX;
  //   console.log(container.dataset.mouseDownAt);
};

window.onmouseup = (e) => {
  container.dataset.mouseDownAt = "0";
  container.dataset.prevPercentage = container.dataset.percentage;
};

window.onmousemove = (e) => {
  if (container.dataset.mouseDownAt == "0") return;

  const mouseDelta = parseFloat(container.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100;
  /* console.log(
    `mouse-delta : ${mouseDelta} , max-delta : ${maxDelta}, percentage : ${percentage}`
  ); */
  const nextPreUniConstrained =
    parseFloat(container.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(Math.min(nextPreUniConstrained, 0), -100);

  container.dataset.percentage = nextPercentage;

  container.animate(
    {
      transform: `translate(${nextPercentage}%,-50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  const listImage = container.getElementsByClassName("image");
  for (const image of listImage) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};
