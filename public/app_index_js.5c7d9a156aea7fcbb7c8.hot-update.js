"use strict";
self["webpackHotUpdateboilerplate"]("app_index_js",{

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

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwX2luZGV4X2pzLjVjN2Q5YTE1NmFlYTdmY2JiN2M4LmhvdC11cGRhdGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUErQjtBQUVxQjtBQUVyQyxNQUFNRSxLQUFLLFNBQVNELDREQUFXLENBQUM7RUFDN0NFLFdBQVdBLENBQUEsRUFBRztJQUNaLEtBQUssQ0FBQztNQUNKQyxPQUFPLEVBQUUsT0FBTztNQUNoQkMsUUFBUSxFQUFFO1FBQ1JDLFFBQVEsRUFBRTtNQUNaLENBQUM7TUFDREMsRUFBRSxFQUFFO0lBQ04sQ0FBQyxDQUFDO0lBRUZQLGtEQUFJLENBQUMsSUFBSSxDQUFDSyxRQUFRLENBQUNDLFFBQVEsRUFBR0YsT0FBTyxJQUFLO01BQ3hDLElBQUksQ0FBQ0ksU0FBUyxDQUFDQyxpQkFBaUIsQ0FBQ0wsT0FBTyxDQUFDO0lBQzNDLENBQUMsQ0FBQztFQUNKO0VBRUFNLFVBQVVBLENBQUNDLFlBQVksRUFBRTtJQUN2QixNQUFNQyxLQUFLLEdBQUcsSUFBSSxDQUFDSixTQUFTLENBQUNLLFNBQVMsQ0FBQ0YsWUFBWSxDQUFDO0lBRXBEWCxrREFBSSxDQUFDWSxLQUFLLEVBQUUsQ0FBQ0UsSUFBSSxFQUFFQyxHQUFHLEtBQUs7TUFDekIsTUFBTUMsS0FBSyxHQUFHSixLQUFLLENBQUNLLE1BQU07TUFFMUIsTUFBTUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDVixTQUFTLENBQUNXLFlBQVksQ0FBQztRQUNwREMsYUFBYSxFQUFFO1VBQ2JDLE9BQU8sRUFBRVAsSUFBSTtVQUNiUSxLQUFLLEVBQUUsaUJBQWlCO1VBQ3hCQyxHQUFHLEVBQUUsY0FBYztVQUNuQkMsS0FBSyxFQUFFLElBQUk7VUFDWEMsbUJBQW1CLEVBQUU7UUFDdkI7TUFDRixDQUFDLENBQUM7O01BRUY7TUFDQVAsaUJBQWlCLENBQUNRLEVBQUUsQ0FBQ1osSUFBSSxFQUFFO1FBQ3pCYSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUNYLEtBQUssR0FBR0QsR0FBRyxJQUFJLElBQUk7UUFDL0JhLElBQUksRUFBRTtNQUNSLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztFQUNKO0VBRUFDLFFBQVFBLENBQUNsQixZQUFZLEVBQUU7SUFDckIsTUFBTW1CLFFBQVEsR0FBRywyQkFBMkIsQ0FBQ0MsSUFBSSxDQUFDQyxTQUFTLENBQUNDLFNBQVMsQ0FBQztJQUN0RSxNQUFNckIsS0FBSyxHQUFHLElBQUksQ0FBQ0osU0FBUyxDQUFDSyxTQUFTLENBQUNGLFlBQVksQ0FBQztJQUVwRFgsa0RBQUksQ0FBQ1ksS0FBSyxFQUFFLENBQUNFLElBQUksRUFBRUMsR0FBRyxLQUFLO01BQ3pCLE1BQU1DLEtBQUssR0FBR0osS0FBSyxDQUFDSyxNQUFNO01BRTFCLElBQUksQ0FBQ2lCLGFBQWEsQ0FBQ0Msb0JBQW9CLENBQUM7UUFDdENDLE1BQU0sRUFBRTtVQUNOZixPQUFPLEVBQUVQLElBQUk7VUFDYlEsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHUCxHQUFHLEdBQUcsRUFBRSxPQUFPO1VBRW5Dc0IsVUFBVSxFQUFFekIsS0FBSyxDQUFDSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1VBQzVCTyxHQUFHLEVBQUVPLFFBQVEsR0FBRyxZQUFZLEdBQUcsWUFBWTtVQUMzQ1EsR0FBRyxFQUFFLElBQUk7VUFDVEMsVUFBVSxFQUFFLEtBQUs7VUFDakJkLG1CQUFtQixFQUFFO1FBQ3ZCO01BQ0YsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0VBQ0o7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL3BhcnRpYWxzL0NhcmRzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlYWNoIGZyb20gXCJsb2Rhc2gvZWFjaFwiO1xuXG5pbXBvcnQgQmFzZUVsZW1lbnQgZnJvbSBcIi4uLy4uL2NsYXNzZXMvQmFzZUVsZW1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZHMgZXh0ZW5kcyBCYXNlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIGVsZW1lbnQ6IFwiLmNhcmRcIixcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIGdsaXRjaGVkOiBcIi5nbGl0Y2hlZFwiLFxuICAgICAgfSxcbiAgICAgIGlkOiBcImNhcmRzXCIsXG4gICAgfSk7XG5cbiAgICBlYWNoKHRoaXMuZWxlbWVudHMuZ2xpdGNoZWQsIChlbGVtZW50KSA9PiB7XG4gICAgICB0aGlzLmFuaW1hdGlvbi5hbmltYXRlR2xpdGNoVGV4dChlbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNjYWxlQ2FyZHMoY2FyZHNXcmFwcGVyKSB7XG4gICAgY29uc3QgY2FyZHMgPSB0aGlzLmFuaW1hdGlvbi5nc2FwQXJyYXkoY2FyZHNXcmFwcGVyKTtcblxuICAgIGVhY2goY2FyZHMsIChjYXJkLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHRvdGFsID0gY2FyZHMubGVuZ3RoO1xuXG4gICAgICBjb25zdCBzY2FsZUNhcmRUaW1lbGluZSA9IHRoaXMuYW5pbWF0aW9uLmdzYXBUaW1lbGluZSh7XG4gICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcbiAgICAgICAgICB0cmlnZ2VyOiBjYXJkLFxuICAgICAgICAgIHN0YXJ0OiBcInRvcCBib3R0b20tPTEwMFwiLFxuICAgICAgICAgIGVuZDogXCJ0b3AgdG9wKz0xMDBcIixcbiAgICAgICAgICBzY3J1YjogdHJ1ZSxcbiAgICAgICAgICBpbnZhbGlkYXRlT25SZWZyZXNoOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIC8vIDIuIEFqb3V0ZXIgbCdhbmltYXRpb24gZGFucyBsYSB0aW1lbGluZVxuICAgICAgc2NhbGVDYXJkVGltZWxpbmUudG8oY2FyZCwge1xuICAgICAgICBzY2FsZTogMSAtICh0b3RhbCAtIGtleSkgKiAwLjAzLFxuICAgICAgICBlYXNlOiBcIm5vbmVcIixcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcGluQ2FyZHMoY2FyZHNXcmFwcGVyKSB7XG4gICAgY29uc3QgaXNNb2JpbGUgPSAvaVBob25lfGlQYWR8aVBvZHxBbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICBjb25zdCBjYXJkcyA9IHRoaXMuYW5pbWF0aW9uLmdzYXBBcnJheShjYXJkc1dyYXBwZXIpO1xuXG4gICAgZWFjaChjYXJkcywgKGNhcmQsIGtleSkgPT4ge1xuICAgICAgY29uc3QgdG90YWwgPSBjYXJkcy5sZW5ndGg7XG5cbiAgICAgIHRoaXMuc2Nyb2xsTWFuYWdlci5jcmVhdGVUcmlnZ2VyT25FbnRlcih7XG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgIHRyaWdnZXI6IGNhcmQsXG4gICAgICAgICAgc3RhcnQ6IGB0b3AtPSR7MjAgKyBrZXkgKiAyMH0lIDIwJWAsXG5cbiAgICAgICAgICBlbmRUcmlnZ2VyOiBjYXJkc1t0b3RhbCAtIDFdLFxuICAgICAgICAgIGVuZDogaXNNb2JpbGUgPyBcImJvdHRvbSA1MCVcIiA6IFwiYm90dG9tIDcwJVwiLFxuICAgICAgICAgIHBpbjogdHJ1ZSxcbiAgICAgICAgICBwaW5TcGFjaW5nOiBmYWxzZSxcbiAgICAgICAgICBpbnZhbGlkYXRlT25SZWZyZXNoOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJlYWNoIiwiQmFzZUVsZW1lbnQiLCJDYXJkcyIsImNvbnN0cnVjdG9yIiwiZWxlbWVudCIsImVsZW1lbnRzIiwiZ2xpdGNoZWQiLCJpZCIsImFuaW1hdGlvbiIsImFuaW1hdGVHbGl0Y2hUZXh0Iiwic2NhbGVDYXJkcyIsImNhcmRzV3JhcHBlciIsImNhcmRzIiwiZ3NhcEFycmF5IiwiY2FyZCIsImtleSIsInRvdGFsIiwibGVuZ3RoIiwic2NhbGVDYXJkVGltZWxpbmUiLCJnc2FwVGltZWxpbmUiLCJzY3JvbGxUcmlnZ2VyIiwidHJpZ2dlciIsInN0YXJ0IiwiZW5kIiwic2NydWIiLCJpbnZhbGlkYXRlT25SZWZyZXNoIiwidG8iLCJzY2FsZSIsImVhc2UiLCJwaW5DYXJkcyIsImlzTW9iaWxlIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInNjcm9sbE1hbmFnZXIiLCJjcmVhdGVUcmlnZ2VyT25FbnRlciIsImNvbmZpZyIsImVuZFRyaWdnZXIiLCJwaW4iLCJwaW5TcGFjaW5nIl0sInNvdXJjZVJvb3QiOiIifQ==