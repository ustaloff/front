<template>
    <div class="fortune-wheel">
        <div class="fortune-wheel__wrapper">
            <div class="wheel dynamic" :class="[`--${currentFortuneWheelSlices.length}`, {spinning: isSpinning}]"
                 :style="`transform: rotate(${wheelDegTo}deg);`">
                <div class="wheel__container outer-shadow"/>
                <div class="wheel__container inner-shadow"/>
                <div class="wheel__container background"/>

                <div class="wheel__container prizes">
                    <div
                        v-for="(item, index) in currentFortuneWheelSlices"
                        :key="`prize-${item.id}`"
                        class="wheel__shard shard prize"
                        :style="getPrizeStyle(index)"
                    >
                        <span :style="`color: ${item.text_color}`">{{ item.lotteryAward.title }}</span>
                    </div>
                </div>

                <div class="wheel__container borders">
                    <div
                        v-for="(item, index) in currentFortuneWheelSlices"
                        :key="`border-${item.id}`"
                        class="wheel__shard shard border"
                        :style="getBorderStyle(index)"
                    />
                </div>

                <div class="wheel__container shadows">
                    <div
                        v-for="(item, index) in currentFortuneWheelSlices"
                        :key="`shadow-${item.id}`"
                        class="wheel__shard shard shadow"
                        :style="getShadowStyle(index)"
                    />
                </div>

                <div class="wheel__container polygons">
                    <div
                        v-for="(item, index) in currentFortuneWheelSlices"
                        :key="`polygon-${item.id}`"
                        class="wheel__shard shard polygon"
                        :style="getPolygonStyle(item, index)"
                    />
                </div>
            </div>

            <div class="wheel adv">
                <div class="wheel__container" v-for="i in 5" :key="`adv-${i}`"/>
            </div>

            <div class="wheel aux">
                <div class="wheel__container" v-for="i in 5" :key="`aux-${i}`"/>
            </div>

            <div
                class="spin-button"
                :class="{ active: isSpinning, spinning: isSpinning }"
                @click="spinWheel"
            >
                SPIN
            </div>
        </div>

        <!-- Pointer indicator at top -->
        <div class="wheel-pointer">
            <div class="pointer-arrow"></div>
        </div>

        <div v-if="selectedPrize" class="prize-display">
            <h3>Congratulations!</h3>
            <p>{{ selectedPrize.lotteryAward.title }}</p>
            <button class="close-prize" @click="selectedPrize = null">Close</button>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const currentFortuneWheelSlices = ref([
    {
        "id": 3936,
        "position": 1,
        "background_gradient_start_color": "#4F4F4F",
        "background_gradient_end_color": "#262627",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 1,
        "lotteryAward": {
            "id": 8,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/5th-award-images-sizing.png",
            "title": "10 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 10 free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3937,
        "position": 2,
        "background_gradient_start_color": "transparent",
        "background_gradient_end_color": "transparent",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 1,
        "lotteryAward": {
            "id": 9,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/4th-award-images-sizing.png",
            "title": "20 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 20 free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3938,
        "position": 3,
        "background_gradient_start_color": "#4F4F4F",
        "background_gradient_end_color": "#262627",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 1,
        "lotteryAward": {
            "id": 10,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/3rd-award-images-sizing.png",
            "title": "25 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 25&nbsp;free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3939,
        "position": 4,
        "background_gradient_start_color": "transparent",
        "background_gradient_end_color": "transparent",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 0,
        "lotteryAward": {
            "id": 11,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/2nd-award-images-sizing.png",
            "title": "30 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 30 free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3940,
        "position": 5,
        "background_gradient_start_color": "#4F4F4F",
        "background_gradient_end_color": "#262627",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 0,
        "lotteryAward": {
            "id": 12,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/1st-Prize-Award.png",
            "title": "40 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 40 free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3941,
        "position": 6,
        "background_gradient_start_color": "transparent",
        "background_gradient_end_color": "transparent",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 1,
        "lotteryAward": {
            "id": 8,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/5th-award-images-sizing.png",
            "title": "10 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 10 free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3942,
        "position": 7,
        "background_gradient_start_color": "#4F4F4F",
        "background_gradient_end_color": "#262627",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 1,
        "lotteryAward": {
            "id": 9,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/4th-award-images-sizing.png",
            "title": "20 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 20 free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3943,
        "position": 8,
        "background_gradient_start_color": "transparent",
        "background_gradient_end_color": "transparent",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 1,
        "lotteryAward": {
            "id": 10,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/3rd-award-images-sizing.png",
            "title": "25 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 25&nbsp;free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3944,
        "position": 9,
        "background_gradient_start_color": "#4F4F4F",
        "background_gradient_end_color": "#262627",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 0,
        "lotteryAward": {
            "id": 11,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/2nd-award-images-sizing.png",
            "title": "30 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 30 free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3945,
        "position": 10,
        "background_gradient_start_color": "transparent",
        "background_gradient_end_color": "transparent",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 1,
        "lotteryAward": {
            "id": 8,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/5th-award-images-sizing.png",
            "title": "10 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 10 free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3946,
        "position": 11,
        "background_gradient_start_color": "#4F4F4F",
        "background_gradient_end_color": "#262627",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 1,
        "lotteryAward": {
            "id": 9,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/4th-award-images-sizing.png",
            "title": "20 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 20 free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3947,
        "position": 12,
        "background_gradient_start_color": "transparent",
        "background_gradient_end_color": "transparent",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 1,
        "lotteryAward": {
            "id": 10,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/3rd-award-images-sizing.png",
            "title": "25 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 25&nbsp;free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3948,
        "position": 13,
        "background_gradient_start_color": "#4F4F4F",
        "background_gradient_end_color": "#262627",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 1,
        "lotteryAward": {
            "id": 11,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/2nd-award-images-sizing.png",
            "title": "30 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 30 free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3949,
        "position": 14,
        "background_gradient_start_color": "transparent",
        "background_gradient_end_color": "transparent",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 0,
        "lotteryAward": {
            "id": 12,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/1st-Prize-Award.png",
            "title": "40 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 40 free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3950,
        "position": 15,
        "background_gradient_start_color": "#4F4F4F",
        "background_gradient_end_color": "#262627",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 1,
        "lotteryAward": {
            "id": 73,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/casino-wheel-outline-flat-pictogram-casino-roulette-spin-black-line-icon-addiction-gambling-play-lottery-betting-sign-lucky-fortune-risk-win-gamble-game-symbol-isolated-illustration-vector.jpg",
            "title": "TRY AGAIN",
            "shortDescription": "Register and try again!",
            "description": "<p>Don&#39;t worry, we have many more surprises. Register and get many other bonuses.</p>",
            "lotteryAwardType": {
                "id": 8,
                "interface_code": "NO_LUCK"
            }
        }
    },
    {
        "id": 3951,
        "position": 16,
        "background_gradient_start_color": "transparent",
        "background_gradient_end_color": "transparent",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 1,
        "lotteryAward": {
            "id": 8,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/5th-award-images-sizing.png",
            "title": "10 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 10 free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3952,
        "position": 17,
        "background_gradient_start_color": "#4F4F4F",
        "background_gradient_end_color": "#262627",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 1,
        "lotteryAward": {
            "id": 9,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/4th-award-images-sizing.png",
            "title": "20 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 20 free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3953,
        "position": 18,
        "background_gradient_start_color": "transparent",
        "background_gradient_end_color": "transparent",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 1,
        "lotteryAward": {
            "id": 10,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/3rd-award-images-sizing.png",
            "title": "25 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 25&nbsp;free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3954,
        "position": 19,
        "background_gradient_start_color": "#4F4F4F",
        "background_gradient_end_color": "#262627",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 0,
        "lotteryAward": {
            "id": 11,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/2nd-award-images-sizing.png",
            "title": "30 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 30 free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3955,
        "position": 20,
        "background_gradient_start_color": "transparent",
        "background_gradient_end_color": "transparent",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 0,
        "lotteryAward": {
            "id": 12,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/1st-Prize-Award.png",
            "title": "40 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 40 free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3956,
        "position": 21,
        "background_gradient_start_color": "#4F4F4F",
        "background_gradient_end_color": "#262627",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 0,
        "lotteryAward": {
            "id": 13,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/50fs3.png",
            "title": "50 Free Spins",
            "shortDescription": "Free No Deposit Bonus!",
            "description": "<p>Hooray! You have won 50 free spins</p>\r\n\r\n<p>Free Spin Game: Princess Suki</p>\r\n\r\n<p>Also you have massive Welcome Pack that is total %175 Bonus!</p>",
            "lotteryAwardType": {
                "id": 1,
                "interface_code": "FREE_SPINS"
            }
        }
    },
    {
        "id": 3957,
        "position": 22,
        "background_gradient_start_color": "transparent",
        "background_gradient_end_color": "transparent",
        "text_color": "#FFFFFF",
        "max_won_count_period": null,
        "is_winnable": 1,
        "lotteryAward": {
            "id": 73,
            "image": "https://dev.winsroyal.com/storage/wr/lottery_award/casino-wheel-outline-flat-pictogram-casino-roulette-spin-black-line-icon-addiction-gambling-play-lottery-betting-sign-lucky-fortune-risk-win-gamble-game-symbol-isolated-illustration-vector.jpg",
            "title": "TRY AGAIN",
            "shortDescription": "Register and try again!",
            "description": "<p>Don&#39;t worry, we have many more surprises. Register and get many other bonuses.</p>",
            "lotteryAwardType": {
                "id": 8,
                "interface_code": "NO_LUCK"
            }
        }
    }
]);

const base = computed(() => {
    const deg = 180 / currentFortuneWheelSlices.value.length;
    const cat = Math.tan(deg * Math.PI / 180);
    return 100 * cat;
});

const getShardStyle = (item, index) => {
    const rotation = (360 / currentFortuneWheelSlices.value.length) * index;
    const clipPath = `polygon(${(100 - base.value) / 2}% 0%, 50% 100%, ${(100 + base.value) / 2}% 0%)`;
    const background = `linear-gradient(0deg, ${item.background_gradient_start_color} 0%, ${item.background_gradient_end_color} 100%)`;

    return {
        transform: `rotate(${rotation}deg)`,
        clipPath,
        background
    };
};

const getPrizeStyle = (index) => {
    return {
        transform: `rotate(${(360 / currentFortuneWheelSlices.value.length) * index}deg)`
    };
};

const getBorderStyle = (index) => {
    return {
        transform: `rotate(${(360 / currentFortuneWheelSlices.value.length) * index}deg)`,
        clipPath: `polygon(calc(${(100 - base.value) / 2}% - 1px) 0, calc(${(100 - base.value) / 2}% + 1px) 0, calc(50% + 1px) 100%, calc(50% - 1px) 100%)`
    };
};

const getShadowStyle = (index) => {
    const rotation = (360 / currentFortuneWheelSlices.value.length) * index;
    const clipPath = `polygon(calc(${(100 - base.value) / 2}% + 0px) 0, calc(${(100 - base.value) / 2}% + 20px) 0, calc(50% + 20px) 100%, calc(50% + 0px) 100%)`;
    const gradientAngle = 90 - 180 / currentFortuneWheelSlices.value.length;
    const gradient = `linear-gradient(${gradientAngle}deg, rgba(0, 0, 0, 0) calc(${(100 - base.value) / 2 + base.value / 4}%), rgba(0, 0, 0, 1) calc(${(100 - base.value) / 2 + base.value / 4}%), rgba(0, 0, 0, 0) calc(${(100 - base.value) / 2 + base.value / 4}% + 20px), rgba(0, 0, 0, 0) calc(${(100 - base.value) / 2 + base.value / 4}% + 20px))`;

    return {
        transform: `rotate(${rotation}deg)`,
        clipPath,
        background: gradient
    };
};

const getPolygonStyle = (item, index) => {
    const rotation = (360 / currentFortuneWheelSlices.value.length) * index;
    const clipPath = `polygon(${(100 - base.value) / 2}% 0%, 50% 100%, ${(100 + base.value) / 2}% 0%)`;
    const background = `linear-gradient(0deg, ${item.background_gradient_start_color} 0%, ${item.background_gradient_end_color} 100%)`;

    return {
        transform: `rotate(${rotation}deg)`,
        clipPath,
        background
    };
};

// Spinning state (matching FortuneWheelPopup)
const isSpinning = ref(false);
const selectedPrize = ref(null);
const wheelDegDefault = ref(0);
const wheelDegFrom = ref(0);
const wheelDegTo = ref(0);

// Exact copy from FortuneWheelPopup
const roll = (sliceIndex) => {
    return new Promise(resolve => {
        isSpinning.value = true;

        wheelDegFrom.value = wheelDegTo.value;

        wheelDegTo.value = wheelDegTo.value - wheelDegTo.value % 360 + 12 * 360 + (360 - 360 / currentFortuneWheelSlices.value.length * sliceIndex) + wheelDegDefault.value;

        setTimeout(() => {
            isSpinning.value = false;

            resolve();
        }, 5200);
    });
};

// Spinning logic (exact copy from FortuneWheelPopup)
const spinWheel = async () => {
    if (isSpinning.value) return;

    selectedPrize.value = null;

    // Select random prize (only from winnable items)
    const winnableSlices = currentFortuneWheelSlices.value.filter(slice => slice.is_winnable === 1);
    const randomPrize = winnableSlices[Math.floor(Math.random() * winnableSlices.length)];
    const prizeIndex = currentFortuneWheelSlices.value.findIndex(slice => slice.id === randomPrize.id);

    roll(prizeIndex)
        .then(() => {
            setTimeout(() => {
                selectedPrize.value = randomPrize;
            }, 1000);
        });
};
</script>

<style lang="scss" scoped>
.fortune-wheel {
    width: 100%;
    max-width: 600px;
    overflow: hidden;
    position: relative;
    margin: 0 auto;

    &:before {
        content: '';
        display: block;
        padding-bottom: 100%;
    }

    &__wrapper {
        width: 100%;
        height: 100%;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
}

.wheel {
    width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    border-radius: 50%;
    container-type: inline-size;

    &.--2 .shard {
        clip-path: none !important;
    }

    &.dynamic {
        width: 80%;
        height: 80%;
        z-index: 1;
        transition: transform 5s cubic-bezier(0.440, -0.205, 0.000, 1.130);
    }

    &.adv {
        z-index: 3;

        :nth-child(5) {
            background-image: url('/public/winsroyal/lucky-wheel/border.svg');
            background-repeat: no-repeat;
            background-size: contain;
            overflow: initial;
            border-radius: 0;
            z-index: 5;
        }
    }

    &__container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border-radius: 50%;
        overflow: hidden;
        z-index: 0;

        &.outer-shadow {
            background: radial-gradient(circle, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.7) 90%, rgba(0, 0, 0, 1) 100%);
            z-index: 7;
        }

        &.inner-shadow {
            background: radial-gradient(circle, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 50%);
            z-index: 6;
        }

        &.borders {
            z-index: 5;
        }

        &.shadows {
            z-index: 4;
        }

        &.prizes {
            z-index: 3;
        }

        &.polygons {
            z-index: 2;
        }

        &.background {
            background: #09c38b;
            background: radial-gradient(circle, #153e56 0%, #09c38b 80%);
            z-index: 1;
        }
    }

    &__shard {
        width: 100%;
        height: 50%;
        position: absolute;
        transform-origin: bottom;
        will-change: transform;

        &.prize {
            display: flex;
            align-items: center;
            justify-content: center;

            span {
                color: #fff;
                font-size: clamp(0.8rem, 0.4rem + 2.7cqw, 1.5rem);
                font-weight: 800;
                line-height: 100%;
                text-align: center;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                backface-visibility: hidden;
                -webkit-backface-visibility: hidden;
                transform: rotate(-90deg);
                padding-inline-start: 15%;
                margin-inline-start: 1%;
                display: inline-block;
            }
        }

        &.border {
            background: #455a63;
        }
    }
}

.spin-button {
    width: 27%;
    height: 27%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(1);
    transform-origin: bottom center;
    transition: transform 0.2s;
    border-radius: 1000px;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    border: 3px solid #fff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

    &:hover {
        transform: translate(-50%, -50%) scale(0.95);
    }

    &.active {
        transform: translate(-50%, -50%) scale(0.9);
    }

    &.spinning {
        pointer-events: none;
        opacity: 0.8;
    }

    img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
    }
}

.prize-display {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 20px 30px;
    border-radius: 15px;
    text-align: center;
    z-index: 20;
    animation: fadeIn 0.5s ease-in;

    h3 {
        margin: 0 0 10px 0;
        color: #4CAF50;
        font-size: 1.5rem;
    }

    p {
        margin: 0;
        font-size: 1.2rem;
        font-weight: bold;
    }

    .close-prize {
        margin-top: 15px;
        padding: 8px 20px;
        background: #4CAF50;
        border: none;
        border-radius: 8px;
        color: white;
        cursor: pointer;
        font-weight: bold;

        &:hover {
            background: #45a049;
        }
    }
}


.wheel-pointer {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 15;

    .pointer-arrow {
        width: 0;
        height: 0;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-top: 30px solid #ff6b6b;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));

        &::after {
            content: '';
            position: absolute;
            top: -35px;
            left: -8px;
            width: 16px;
            height: 16px;
            background: #fff;
            border-radius: 50%;
            border: 3px solid #ff6b6b;
        }
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

@media (max-width: 768px) {
    .fortune-wheel {
        max-width: 350px;
    }

    .wheel__shard.prize span {
        font-size: clamp(0.7rem, 0.3rem + 2.5cqw, 1.2rem);
    }
}

@media (max-width: 480px) {
    .fortune-wheel {
        max-width: 300px;
    }

    .wheel__shard.prize span {
        font-size: clamp(0.6rem, 0.2rem + 2.3cqw, 1rem);
        padding-inline-start: 10%;
    }
}
</style>