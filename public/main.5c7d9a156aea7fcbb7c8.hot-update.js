"use strict";
self["webpackHotUpdateboilerplate"]("main",{

/***/ "./app/partials/Cards/index.js":
/*!*************************************!*\
  !*** ./app/partials/Cards/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cards)
/* harmony export */ });
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/BaseElement */ "./app/classes/BaseElement.js");


class Cards extends _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super({
      element: ".card",
      elements: {
        glitched: ".glitched"
      },
      id: "cards"
    });
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(this.elements.glitched, element => {
      this.animation.animateGlitchText(element);
    });
  }
  scaleCards(cardsWrapper) {
    const cards = this.animation.gsapArray(cardsWrapper);
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(cards, (card, key) => {
      const total = cards.length;
      const scaleCardTimeline = this.animation.gsapTimeline({
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          end: "top top+=100",
          scrub: true,
          invalidateOnRefresh: true
        }
      });

      // 2. Ajouter l'animation dans la timeline
      scaleCardTimeline.to(card, {
        scale: 1 - (total - key) * 0.03,
        ease: "none"
      });
    });
  }
  pinCards(cardsWrapper) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const cards = this.animation.gsapArray(cardsWrapper);
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(cards, (card, key) => {
      const total = cards.length;
      this.scrollManager.createTriggerOnEnter({
        config: {
          trigger: card,
          start: `top-=${20 + key * 20}% 20%`,
          endTrigger: cards[total - 1],
          end: isMobile ? "bottom 50%" : "bottom 70%",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true
        }
      });
    });
  }
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f572de1b19353897192f")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi41YzdkOWExNTZhZWE3ZmNiYjdjOC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0I7QUFFcUI7QUFFckMsTUFBTUUsS0FBSyxTQUFTRCw0REFBVyxDQUFDO0VBQzdDRSxXQUFXQSxDQUFBLEVBQUc7SUFDWixLQUFLLENBQUM7TUFDSkMsT0FBTyxFQUFFLE9BQU87TUFDaEJDLFFBQVEsRUFBRTtRQUNSQyxRQUFRLEVBQUU7TUFDWixDQUFDO01BQ0RDLEVBQUUsRUFBRTtJQUNOLENBQUMsQ0FBQztJQUVGUCxrREFBSSxDQUFDLElBQUksQ0FBQ0ssUUFBUSxDQUFDQyxRQUFRLEVBQUdGLE9BQU8sSUFBSztNQUN4QyxJQUFJLENBQUNJLFNBQVMsQ0FBQ0MsaUJBQWlCLENBQUNMLE9BQU8sQ0FBQztJQUMzQyxDQUFDLENBQUM7RUFDSjtFQUVBTSxVQUFVQSxDQUFDQyxZQUFZLEVBQUU7SUFDdkIsTUFBTUMsS0FBSyxHQUFHLElBQUksQ0FBQ0osU0FBUyxDQUFDSyxTQUFTLENBQUNGLFlBQVksQ0FBQztJQUVwRFgsa0RBQUksQ0FBQ1ksS0FBSyxFQUFFLENBQUNFLElBQUksRUFBRUMsR0FBRyxLQUFLO01BQ3pCLE1BQU1DLEtBQUssR0FBR0osS0FBSyxDQUFDSyxNQUFNO01BRTFCLE1BQU1DLGlCQUFpQixHQUFHLElBQUksQ0FBQ1YsU0FBUyxDQUFDVyxZQUFZLENBQUM7UUFDcERDLGFBQWEsRUFBRTtVQUNiQyxPQUFPLEVBQUVQLElBQUk7VUFDYlEsS0FBSyxFQUFFLGlCQUFpQjtVQUN4QkMsR0FBRyxFQUFFLGNBQWM7VUFDbkJDLEtBQUssRUFBRSxJQUFJO1VBQ1hDLG1CQUFtQixFQUFFO1FBQ3ZCO01BQ0YsQ0FBQyxDQUFDOztNQUVGO01BQ0FQLGlCQUFpQixDQUFDUSxFQUFFLENBQUNaLElBQUksRUFBRTtRQUN6QmEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDWCxLQUFLLEdBQUdELEdBQUcsSUFBSSxJQUFJO1FBQy9CYSxJQUFJLEVBQUU7TUFDUixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7RUFDSjtFQUVBQyxRQUFRQSxDQUFDbEIsWUFBWSxFQUFFO0lBQ3JCLE1BQU1tQixRQUFRLEdBQUcsMkJBQTJCLENBQUNDLElBQUksQ0FBQ0MsU0FBUyxDQUFDQyxTQUFTLENBQUM7SUFDdEUsTUFBTXJCLEtBQUssR0FBRyxJQUFJLENBQUNKLFNBQVMsQ0FBQ0ssU0FBUyxDQUFDRixZQUFZLENBQUM7SUFFcERYLGtEQUFJLENBQUNZLEtBQUssRUFBRSxDQUFDRSxJQUFJLEVBQUVDLEdBQUcsS0FBSztNQUN6QixNQUFNQyxLQUFLLEdBQUdKLEtBQUssQ0FBQ0ssTUFBTTtNQUUxQixJQUFJLENBQUNpQixhQUFhLENBQUNDLG9CQUFvQixDQUFDO1FBQ3RDQyxNQUFNLEVBQUU7VUFDTmYsT0FBTyxFQUFFUCxJQUFJO1VBQ2JRLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBR1AsR0FBRyxHQUFHLEVBQUUsT0FBTztVQUVuQ3NCLFVBQVUsRUFBRXpCLEtBQUssQ0FBQ0ksS0FBSyxHQUFHLENBQUMsQ0FBQztVQUM1Qk8sR0FBRyxFQUFFTyxRQUFRLEdBQUcsWUFBWSxHQUFHLFlBQVk7VUFDM0NRLEdBQUcsRUFBRSxJQUFJO1VBQ1RDLFVBQVUsRUFBRSxLQUFLO1VBQ2pCZCxtQkFBbUIsRUFBRTtRQUN2QjtNQUNGLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztFQUNKO0FBQ0Y7Ozs7Ozs7O1VDaEVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvcGFydGlhbHMvQ2FyZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlYWNoIGZyb20gXCJsb2Rhc2gvZWFjaFwiO1xuXG5pbXBvcnQgQmFzZUVsZW1lbnQgZnJvbSBcIi4uLy4uL2NsYXNzZXMvQmFzZUVsZW1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZHMgZXh0ZW5kcyBCYXNlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIGVsZW1lbnQ6IFwiLmNhcmRcIixcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIGdsaXRjaGVkOiBcIi5nbGl0Y2hlZFwiLFxuICAgICAgfSxcbiAgICAgIGlkOiBcImNhcmRzXCIsXG4gICAgfSk7XG5cbiAgICBlYWNoKHRoaXMuZWxlbWVudHMuZ2xpdGNoZWQsIChlbGVtZW50KSA9PiB7XG4gICAgICB0aGlzLmFuaW1hdGlvbi5hbmltYXRlR2xpdGNoVGV4dChlbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNjYWxlQ2FyZHMoY2FyZHNXcmFwcGVyKSB7XG4gICAgY29uc3QgY2FyZHMgPSB0aGlzLmFuaW1hdGlvbi5nc2FwQXJyYXkoY2FyZHNXcmFwcGVyKTtcblxuICAgIGVhY2goY2FyZHMsIChjYXJkLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHRvdGFsID0gY2FyZHMubGVuZ3RoO1xuXG4gICAgICBjb25zdCBzY2FsZUNhcmRUaW1lbGluZSA9IHRoaXMuYW5pbWF0aW9uLmdzYXBUaW1lbGluZSh7XG4gICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcbiAgICAgICAgICB0cmlnZ2VyOiBjYXJkLFxuICAgICAgICAgIHN0YXJ0OiBcInRvcCBib3R0b20tPTEwMFwiLFxuICAgICAgICAgIGVuZDogXCJ0b3AgdG9wKz0xMDBcIixcbiAgICAgICAgICBzY3J1YjogdHJ1ZSxcbiAgICAgICAgICBpbnZhbGlkYXRlT25SZWZyZXNoOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIC8vIDIuIEFqb3V0ZXIgbCdhbmltYXRpb24gZGFucyBsYSB0aW1lbGluZVxuICAgICAgc2NhbGVDYXJkVGltZWxpbmUudG8oY2FyZCwge1xuICAgICAgICBzY2FsZTogMSAtICh0b3RhbCAtIGtleSkgKiAwLjAzLFxuICAgICAgICBlYXNlOiBcIm5vbmVcIixcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcGluQ2FyZHMoY2FyZHNXcmFwcGVyKSB7XG4gICAgY29uc3QgaXNNb2JpbGUgPSAvaVBob25lfGlQYWR8aVBvZHxBbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICBjb25zdCBjYXJkcyA9IHRoaXMuYW5pbWF0aW9uLmdzYXBBcnJheShjYXJkc1dyYXBwZXIpO1xuXG4gICAgZWFjaChjYXJkcywgKGNhcmQsIGtleSkgPT4ge1xuICAgICAgY29uc3QgdG90YWwgPSBjYXJkcy5sZW5ndGg7XG5cbiAgICAgIHRoaXMuc2Nyb2xsTWFuYWdlci5jcmVhdGVUcmlnZ2VyT25FbnRlcih7XG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgIHRyaWdnZXI6IGNhcmQsXG4gICAgICAgICAgc3RhcnQ6IGB0b3AtPSR7MjAgKyBrZXkgKiAyMH0lIDIwJWAsXG5cbiAgICAgICAgICBlbmRUcmlnZ2VyOiBjYXJkc1t0b3RhbCAtIDFdLFxuICAgICAgICAgIGVuZDogaXNNb2JpbGUgPyBcImJvdHRvbSA1MCVcIiA6IFwiYm90dG9tIDcwJVwiLFxuICAgICAgICAgIHBpbjogdHJ1ZSxcbiAgICAgICAgICBwaW5TcGFjaW5nOiBmYWxzZSxcbiAgICAgICAgICBpbnZhbGlkYXRlT25SZWZyZXNoOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImY1NzJkZTFiMTkzNTM4OTcxOTJmXCIpIl0sIm5hbWVzIjpbImVhY2giLCJCYXNlRWxlbWVudCIsIkNhcmRzIiwiY29uc3RydWN0b3IiLCJlbGVtZW50IiwiZWxlbWVudHMiLCJnbGl0Y2hlZCIsImlkIiwiYW5pbWF0aW9uIiwiYW5pbWF0ZUdsaXRjaFRleHQiLCJzY2FsZUNhcmRzIiwiY2FyZHNXcmFwcGVyIiwiY2FyZHMiLCJnc2FwQXJyYXkiLCJjYXJkIiwia2V5IiwidG90YWwiLCJsZW5ndGgiLCJzY2FsZUNhcmRUaW1lbGluZSIsImdzYXBUaW1lbGluZSIsInNjcm9sbFRyaWdnZXIiLCJ0cmlnZ2VyIiwic3RhcnQiLCJlbmQiLCJzY3J1YiIsImludmFsaWRhdGVPblJlZnJlc2giLCJ0byIsInNjYWxlIiwiZWFzZSIsInBpbkNhcmRzIiwiaXNNb2JpbGUiLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50Iiwic2Nyb2xsTWFuYWdlciIsImNyZWF0ZVRyaWdnZXJPbkVudGVyIiwiY29uZmlnIiwiZW5kVHJpZ2dlciIsInBpbiIsInBpblNwYWNpbmciXSwic291cmNlUm9vdCI6IiJ9