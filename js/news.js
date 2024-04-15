document.addEventListener('DOMContentLoaded', function() {
    setStudentInfo(); 
    fetchNews();
});

function setStudentInfo() {
    const studentInfo = document.getElementById('student-info');
    studentInfo.textContent = 'Name: Agnel Augustine, Student Number: 20055588';
}

async function fetchNews() {
    const apiKey = '6824345a3b0946eea5de8af9405d5dd0';
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        console.log("HTTP Response:", response);
        const data = await response.json();
        console.log("Parsed Data:", data);
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        const container = document.getElementById('news-container');
        container.innerHTML = '<p>Failed to fetch news. Please try again later.</p>';
    }
}

function displayNews(articles) {
    const container = document.getElementById('news-container');
    articles.forEach(article => {
        const div = document.createElement('div');
        div.className = 'article';
        div.innerHTML = `
            <div class="news-image">
                <img src="${article.urlToImage || 'default-image-path.jpg'}" alt="News Image" style="width:100%;height:auto;">
            </div>
            <h2 class="title">${article.title}</h2>
            <p class="description">${article.description || 'No description available.'}</p>
            <a href="${article.url}" target="_blank" class="read-more-btn">Read more...</a>
        `;
        container.appendChild(div);
    });
}
