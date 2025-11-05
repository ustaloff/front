<template>
    <footer class="app-footer">
        <div class="footer-content container">
            <p>&copy; 2024 CodeCraft. Все права защищены.</p>
            <div class="footer-links">
                <a href="#">Правила</a>
                <a href="#">Поддержка</a>
                <a href="#">О нас</a>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '@/assets/media' as *;
@use '@/assets/variables' as *;

.app-footer {
    background: var(--footer-background);
    color: var(--footer-text-color);
    //padding: 1rem 0;
    margin-top: auto;
}

.footer-content {
    //max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include respond-to(md) {
        text-align: center;
        flex-direction: column;
        gap: 1rem;
    }
}

.footer-links {
    display: flex;
    gap: 1rem;
}

.footer-links a {
    color: $success-color;
    text-decoration: none;
    transition: color 0.3s;
}

.footer-links a:hover {
    color: color.adjust($success-color, $lightness: 30%);
}

/*@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
}*/
</style>