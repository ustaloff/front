import { ref } from 'vue';

// Duration of the spin animation in milliseconds.
// This should be kept in sync with the CSS transition duration.
export const SPIN_DURATION = 5000;
const SPIN_ROTATIONS = 12; // Number of full rotations during a spin.

/**
 * A composable function to manage the state and logic of a fortune wheel.
 *
 * @param {import('vue').Ref<Array>} slices - A Vue ref containing the array of wheel slices.
 * @returns {{
 *  isSpinning: import('vue').Ref<boolean>,
 *  selectedPrize: import('vue').Ref<Object|null>,
 *  wheelRotation: import('vue').Ref<number>,
 *  spin: (prize?: Object) => Promise<Object>
 * }}
 */
export function useWheel(slices) {
    const isSpinning = ref(false);
    const selectedPrize = ref(null);
    const wheelRotation = ref(0);
    const wheelDegDefault = ref(0); // Initial offset

    /**
     * Starts the wheel spinning to land on a specific prize.
     * @param {Object} prize - The prize object to land on.
     * @returns {Promise<Object>} A promise that resolves with the prize when the spin is complete.
     */
    const rollToPrize = (prize) => {
        return new Promise(resolve => {
            if (!slices.value || slices.value.length === 0) {
                console.error("Wheel slices are not defined or empty.");
                return resolve(null);
            }

            const prizeIndex = slices.value.findIndex(slice => slice.id === prize.id);
            if (prizeIndex === -1) {
                console.error("Selected prize not found in slices array.");
                return resolve(null);
            }

            isSpinning.value = true;
            selectedPrize.value = null;

            const currentRotation = wheelRotation.value;
            const rotationReset = currentRotation - (currentRotation % 360);
            const sliceAngle = 360 / slices.value.length;
            const prizeAngle = 360 - (sliceAngle * prizeIndex);

            wheelRotation.value = rotationReset
                + (SPIN_ROTATIONS * 360)
                + prizeAngle
                + wheelDegDefault.value;

            setTimeout(() => {
                isSpinning.value = false;
                selectedPrize.value = prize;
                resolve(prize);
            }, SPIN_DURATION + 200); // Add a small buffer
        });
    };

    /**
     * Initiates a spin. If a prize is provided, it will land on that prize.
     * Otherwise, it selects a random winnable prize.
     * @param {Object|null} [prize=null] - The specific prize to win.
     * @returns {Promise<Object>} A promise that resolves with the winning prize.
     */
    const spin = async (prize = null) => {
        if (isSpinning.value) return Promise.reject("Already spinning.");

        let prizeToWin = prize;

        if (!prizeToWin) {
            const winnableSlices = slices.value.filter(slice => slice.is_winnable === 1);
            if (winnableSlices.length === 0) {
                console.warn("No winnable slices available to spin to.");
                // Find a "NO_LUCK" slice if available
                const noLuckSlice = slices.value.find(s => s.lotteryAward.lotteryAwardType.interface_code === 'NO_LUCK');
                if (noLuckSlice) {
                    prizeToWin = noLuckSlice;
                } else {
                    return Promise.reject("No winnable slices and no 'NO_LUCK' slice found.");
                }
            } else {
                prizeToWin = winnableSlices[Math.floor(Math.random() * winnableSlices.length)];
            }
        }

        return rollToPrize(prizeToWin);
    };

    return {
        isSpinning,
        selectedPrize,
        wheelRotation,
        spin,
    };
}
