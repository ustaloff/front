import { VALIDATION } from '@/config';

/**
 * Русские сообщения валидации для форм аутентификации
 */
export const VALIDATION_MESSAGES_RU = {
    email: {
        required: 'Email обязателен для заполнения',
        invalid: 'Неверный формат email адреса'
    },
    password: {
        required: 'Пароль обязателен для заполнения',
        minLength: `Пароль должен содержать минимум ${VALIDATION.PASSWORD_MIN_LENGTH} символов`
    },
    name: {
        required: 'Имя обязательно для заполнения',
        maxLength: `Имя не может превышать ${VALIDATION.NAME_MAX_LENGTH} символов`
    },
    passwordConfirmation: {
        required: 'Подтверждение пароля обязательно',
        mismatch: 'Пароли не совпадают'
    }
};

/**
 * Валидатор для формы входа (PrimeVue Forms совместимый)
 * @param {Object} values - Значения формы в формате {email: string, password: string}
 * @returns {Object} Объект с ошибками валидации в формате PrimeVue Forms
 */
export const loginResolver = ({ values }) => {
    console.log('🔍 loginResolver values:', values);

    const email = values.email || '';
    const password = values.password || '';

    console.log('📝 Extracted values:', { email, password });

    const errors = {};

    // Валидация email (возвращаем массив как в официальном примере)
    if (!email || email.trim() === '') {
        errors.email = [{ message: VALIDATION_MESSAGES_RU.email.required }];
    } else if (!VALIDATION.EMAIL_REGEX.test(email.trim())) {
        errors.email = [{ message: VALIDATION_MESSAGES_RU.email.invalid }];
    }

    // Валидация пароля (возвращаем массив как в официальном примере)
    if (!password || password.trim() === '') {
        errors.password = [{ message: VALIDATION_MESSAGES_RU.password.required }];
    }

    console.log('📝 loginResolver errors:', errors);

    // Возвращаем объект с ключом errors (как в официальном примере)
    return { errors };
};

/**
 * Валидатор для формы регистрации (PrimeVue Forms совместимый)
 * @param {Object} values - Значения формы в формате {name: string, email: string, password: string, passwordConfirmation: string}
 * @returns {Object} Объект с ошибками валидации в формате PrimeVue Forms
 */
export const registerResolver = ({ values }) => {
    const name = values.name || '';
    const email = values.email || '';
    const password = values.password || '';
    const passwordConfirmation = values.passwordConfirmation || '';

    const errors = {};

    // Валидация имени (возвращаем массив как в официальном примере)
    if (!name || name.trim() === '') {
        errors.name = [{ message: VALIDATION_MESSAGES_RU.name.required }];
    } else if (name.length > VALIDATION.NAME_MAX_LENGTH) {
        errors.name = [{ message: VALIDATION_MESSAGES_RU.name.maxLength }];
    }

    // Валидация email (возвращаем массив как в официальном примере)
    if (!email || email.trim() === '') {
        errors.email = [{ message: VALIDATION_MESSAGES_RU.email.required }];
    } else if (!VALIDATION.EMAIL_REGEX.test(email.trim())) {
        errors.email = [{ message: VALIDATION_MESSAGES_RU.email.invalid }];
    }

    // Валидация пароля (возвращаем массив как в официальном примере)
    if (!password || password.trim() === '') {
        errors.password = [{ message: VALIDATION_MESSAGES_RU.password.required }];
    } else if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
        errors.password = [{ message: VALIDATION_MESSAGES_RU.password.minLength }];
    }

    // Валидация подтверждения пароля (возвращаем массив как в официальном примере)
    if (!passwordConfirmation || passwordConfirmation.trim() === '') {
        errors.passwordConfirmation = [{ message: VALIDATION_MESSAGES_RU.passwordConfirmation.required }];
    } else if (password !== passwordConfirmation) {
        errors.passwordConfirmation = [{ message: VALIDATION_MESSAGES_RU.passwordConfirmation.mismatch }];
    }

    // Возвращаем объект с ключом errors (как в официальном примере)
    return { errors };
};
