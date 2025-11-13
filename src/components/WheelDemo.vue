<template>
    <div class="wheel-demo-container">
        <Wheel :slices="currentFortuneWheelSlices" @spin-end="handleSpinEnd" />
        <PrizeDisplay
            v-if="showPrize"
            :prize="wonPrize"
            @close="showPrize = false"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Wheel from './media/Wheel.vue';
import PrizeDisplay from './popups/PrizeDisplay.vue';

const showPrize = ref(false);
const wonPrize = ref(null);

const handleSpinEnd = (prize) => {
    if (prize) {
        wonPrize.value = prize;
        // Delay showing the prize modal for a better user experience
        setTimeout(() => {
            showPrize.value = true;
        }, 500);
    }
};

// The slice data remains here for demonstration purposes.
// In a real app, this would likely come from an API.
const currentFortuneWheelSlices = ref([
    {
        "id": 3936,
        "position": 1,
        "background_gradient_start_color": "#4F4F4F",
        "background_gradient_end_color": "#262627",
        "text_color": "#FFFFFF",
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
</script>

<style lang="scss" scoped>
.wheel-demo-container {
    // The container can have its own styles if needed, for example, to center the wheel on the page.
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    box-sizing: border-box;
}
</style>