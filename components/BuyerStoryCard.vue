<template>
  <div class="stories__comments__block">
    <div class="stories__comments__block__author">
      <img
        src="/img/become-expert/comment.png"
        alt="avatar"
        class="stories__comments__block__author__img"
      />
      <div class="stories__comments__block__author__name">
        <p class="stories__comments__block__author__name__nick">Darin Nguyen</p>
        <span class="stories__comments__block__author__name__tag"
          >@staking</span
        >
      </div>
    </div>
    <div class="stories__comments__block__text">
      <p>People love our logo, and we love InstaService.</p>
    </div>
    <div class="stories__comments__block__info">
      <a href="" class="stories__comments__block__info__original"
        >Show original</a
      >
      <p class="stories__comments__block__info__date">22.03.2021</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.stories {
  &__comments {
    &__block {
      background-color: rgb(250, 250, 250);
      padding: 6px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 15px;

      &__author {
        display: flex;
        align-items: center;
        gap: 10px;

        &__img {
          width: 40px;
          border-radius: 50%;
        }

        &__name {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;

          &__nick {
            font-weight: 700;
            font-size: 14px;
            color: $purpleColor;
          }

          &__tag {
            font-weight: 400;
            font-size: 14px;
            color: rgba(60, 60, 67, 0.5);
          }
        }
      }

      &__text {
        font-weight: 400;
        font-size: 18px;
      }

      &__info {
        display: flex;
        justify-content: space-between;

        &__original {
          color: rgba(60, 60, 67, 0.5);
          font-weight: 400;
          font-size: 14px;
          text-decoration: underline;
        }

        &__date {
          color: rgba(60, 60, 67, 0.5);
          font-weight: 400;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
