// 1. Mengambil elemen HTML (DOM)

const searchForm = document.getElementById("search-form");

const usernameInput = document.getElementById("username-input");

const loading = document.getElementById("loading");

const errorMessage = document.getElementById("error-message");

const profileContainer = document.getElementById("profile-container");

const profileAvatar = document.getElementById("profile-avatar");

const profileName = document.getElementById("profile-name");

const profileBio = document.getElementById("profile-bio");

const profileRepos = document.getElementById("profile-repos");

const profileLink = document.getElementById("profile-link");

// 2. Event Handling

searchForm.addEventListener("submit", function(event) {

    // Mencegah halaman melakukan reload
    event.preventDefault();

    // Mengambil username dari input
    const username = usernameInput.value.trim();

    // Memastikan username tidak kosong
    if (username === "") {
        showError("Silakan masukkan username GitHub!");
        return;
    }

    // Memanggil fungsi pencarian profil
    searchGitHubProfile(username);

});
// 3. Fungsi pencarian profil GitHub

async function searchGitHubProfile(username) {

    // Menampilkan loading
    loading.classList.remove("hidden");

    // Menyembunyikan pesan error sebelumnya
    errorMessage.classList.add("hidden");

    // Menyembunyikan profil sebelumnya
    profileContainer.classList.add("hidden");

    try {

        // Mengambil data dari REST API GitHub
        const response = await fetch(
            https://api.github.com/users/${encodeURIComponent(username)}
        );

        // Memeriksa apakah permintaan berhasil
        if (!response.ok) {

            if (response.status === 404) {
                throw new Error("Username GitHub tidak ditemukan!");
            }

            if (response.status === 403 || response.status === 429) {
                throw new Error(
                    "Batas permintaan API GitHub tercapai. Coba lagi nanti."
                );
            }

            throw new Error("Terjadi kesalahan saat mengambil data GitHub.");

        }

        // Mengubah respons menjadi format JSON
        const data = await response.json();

        // Menampilkan data profil
        displayProfile(data);

    } catch (error) {

        // Menampilkan pesan kesalahan
        showError(error.message);

    } finally {

        // Menyembunyikan loading
        loading.classList.add("hidden");

    }

}
// 4. Fungsi menampilkan data profil

function displayProfile(user) {

    // Menampilkan foto profil
    profileAvatar.src = user.avatar_url;

    // Menampilkan nama pengguna
    profileName.textContent =
        user.name || user.login;

    // Menampilkan bio pengguna
    profileBio.textContent =
        user.bio || "Pengguna ini belum memiliki bio.";

    // Menampilkan jumlah repositori publik
    profileRepos.textContent = user.public_repos;

    // Menampilkan tautan profil GitHub
    profileLink.href = user.html_url;

    // Menampilkan container profil
    profileContainer.classList.remove("hidden");

}
// 5. Fungsi menampilkan pesan error

function showError(message) {

    // Mengisi pesan error
    errorMessage.textContent = message;

    // Menampilkan pesan error
    errorMessage.classList.remove("hidden");

    // Menyembunyikan hasil profil
    profileContainer.classList.add("hidden");

}