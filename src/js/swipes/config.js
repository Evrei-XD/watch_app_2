const navigation = {
  top1: {
    directions: {
      up: `center`
     // down: `top2`
    },
    section: `#top1`
  },
  top2: {
    directions: {},
    section: `#top2`
  },
  bottom1: {
    directions: { down: `center` },
    section: `#bottom1`
  },
  left1: {
    directions: {
      up: `bottom1`,
      left: `center`,
      right: `left2`,
      down: `top1`
    },
    section: `#left1`
  },
  left2: {
    directions: {
      up: `bottom1`,
      left: `left1`,
      right: `right3`,
      down: `top1`
    },
    section: `#left2`
  },
  right1: {
    directions: {
      up: `bottom1`,
      right: `center`,
      left: `right2`,
      down: `top1`
    },
    section: `#right1`
  },
  right2: {
    directions: {
      up: `bottom1`,
      right: `right1`,
      left: `right3`,
      down: `top1`
    },
    section: `#right2`
  },
  right3: {
    up: `bottom1`,
    directions: {
      up: `bottom1`,
      right: `right2`,
      left: `left2`,
      down: `top1`
    },
    section: `#right2`
  },
  center: {
    directions: {
      //up: `bottom1`,
      //down: `top1`,
      //left: `right1`,
      //right: `left1`
    },
    section: `#center`
  }
};
