interface TouchObject {
  ImageContainer: HTMLElement;
  CoverElement: HTMLElement;
  LinkElement: HTMLAnchorElement;
  Visible: boolean;
}

const imageContainers = document.querySelectorAll("#image-container");

let touchObjectsArray: TouchObject[] = [];

imageContainers.forEach((container) => {
  let touchObject: TouchObject = {
    ImageContainer: container as HTMLElement,
    CoverElement: container.querySelector("#cover") as HTMLElement,
    LinkElement: container.querySelector("#link") as HTMLAnchorElement,
    Visible: true,
  };
  touchObjectsArray.push(touchObject);
});

const isTouchDevice = "ontouchstart" in document.documentElement;

touchObjectsArray.forEach((touchObject) => {
  if (isTouchDevice) {
    touchObject.ImageContainer.addEventListener("touchend", function (event) {
      event.preventDefault();
      if (touchObject.Visible) {
        touchObjectsArray.forEach((touchObject) => {
          touchObject.CoverElement.style.opacity = "1";
          touchObject.Visible = true;
        });
        // First tap, change opacity of image
        touchObject.CoverElement.style.opacity = "0";
        touchObject.Visible = false;
      } else {
        // Second tap, redirect to link
        window.location.href = touchObject.LinkElement.href;
      }
    });
  } else {
    touchObject.ImageContainer.addEventListener("mouseenter", function () {
      touchObject.CoverElement.classList.add("opacity-0");
    });
    touchObject.ImageContainer.addEventListener("mouseleave", function () {
      touchObject.CoverElement.classList.remove("opacity-0");
    });
  }
});