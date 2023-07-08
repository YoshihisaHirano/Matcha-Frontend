<template>
    <header>
        <ThemeToggle/>
        <div class="user-profile-container">
            <NotificationIcon/>
            <ProfilePictureSmall username="Lorem Ipsum" />
        </div>
    </header>
</template>

<style>
header {
    grid-column: 2/3;
    grid-row: 1/2;
    display: flex;
    justify-content: space-between;
    align-self: center;
    padding: .5rem .85rem;
}

.user-profile-container {
    display: flex;
    align-items: center;
}
</style>