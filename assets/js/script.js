// 1. Xử lý giao diện Menu Active
const listButton = document.querySelectorAll(".inner-menu li a");
listButton.forEach(button => {
  button.addEventListener("click", () => {
    const buttonActiveCurrent = document.querySelector(".inner-menu a.active");
    if (buttonActiveCurrent) {
      buttonActiveCurrent.classList.remove("active");
    }
    button.classList.add("active");
  });
});

const currentPath = window.location.pathname.split('/').pop();
listButton.forEach(button => {
  if (button.getAttribute('href') === currentPath) {
    button.classList.add('active');
  }
});

// 2. Định nghĩa các hàm Fetch (Lấy dữ liệu từ Backend)

async function fetchProgress(studentId) {
  try {
    const response = await fetch(`http://localhost:8080/api/core/progress/${studentId}`);
    const data = await response.json();
    console.log("Dữ liệu fetchProgress:", data);
  } catch (error) {
    console.error("Lỗi trong fetchProgress:", error);
  }
}

async function fetchMissingSubjects(studentId) {
  try {
    const response = await fetch(`http://localhost:8080/api/core/missing-subjects/${studentId}`);
    const data = await response.json();
    console.log("Dữ liệu fetchMissingSubjects:", data);
  } catch (error) {
    console.error("Lỗi trong fetchMissingSubjects:", error);
  }
}

async function predictGrade(studentId, courseId) {
  try {
    const response = await fetch(`http://localhost:8080/api/ai/predict-grade`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ studentId, courseId })
    });
    const data = await response.json();
    console.log("Dữ liệu predictGrade:", data);
  } catch (error) {
    console.error("Lỗi trong predictGrade:", error);
  }
}

async function predictGraduation(studentId) {
  try {
    const response = await fetch(`http://localhost:8080/api/ai/expected-graduate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ studentId })
    });
    const data = await response.json();
    console.log("Dữ liệu predictGraduation:", data);
  } catch (error) {
    console.error("Lỗi trong predictGraduation:", error);
  }
}

// 3. KHỞI CHẠY (GỌI HÀM) - Đặt ở cuối cùng để không bị lỗi "not defined"
// Bạn có thể thay "3122411001" bằng mã số của bạn để test
fetchProgress("3122411001");
fetchMissingSubjects("3122411001");
predictGrade("3122411001", "IT001");
predictGraduation("3122411001");