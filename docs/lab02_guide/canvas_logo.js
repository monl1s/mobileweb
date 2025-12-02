document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('kkuLogoCanvas');

    // ตรวจสอบขนาดของ Canvas ตามที่ CSS กำหนด (ควรเป็นจัตุรัสตามที่ตั้งใน HTML)
    const W = canvas.width;
    const H = canvas.height;
    const centerX = W / 2;
    const centerY = H / 2;

    const ctx = canvas.getContext('2d');
    
    // ค่าสี KKU
    const colorPrimary = '#4a148c'; // ม่วง KKU
    const colorSecondary = '#ffcc00'; // เหลือง KKU
    
    // การตั้งค่า Animation
    const text = 'KKU';
    const textFontSize = '20px';
    const circleRadius = 35; // รัศมีวงแหวน
    
    let frame = 0;

    // ฟังก์ชันหลักในการวาด Animation
    function animate() {
        // 1. ล้าง Canvas (หรือเติมด้วยพื้นหลังทึบ)
        ctx.clearRect(0, 0, W, H);

        // 2. วาดข้อความ "KKU" ตรงกลาง (Core)
        ctx.font = `bold ${textFontSize} Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // สร้าง Glow Effect ให้ข้อความ
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Pulse/Breath Effect: ทำให้การเรืองแสงเปลี่ยนไปมา
        const glowStrength = 15 + Math.sin(frame * 0.08) * 5; 
        ctx.shadowBlur = glowStrength;
        ctx.shadowColor = colorSecondary; // เรืองแสงสีเหลือง
        
        ctx.fillStyle = 'white';
        ctx.fillText(text, centerX, centerY);
        
        ctx.shadowBlur = 0; // ปิดเงาแสงสำหรับส่วนอื่น
        
        // 3. วงแหวนหมุน (Rotation Ring)
        
        // บันทึกสถานะปัจจุบัน
        ctx.save(); 
        
        // ย้ายจุดหมุนมาที่กึ่งกลาง Canvas
        ctx.translate(centerX, centerY);
        
        // หมุนตามเวลา (ทิศทางทวนเข็มนาฬิกา)
        ctx.rotate(-frame * 0.02); 
        
        // วาดวงแหวน (Ring)
        ctx.beginPath();
        ctx.arc(0, 0, circleRadius, 0, Math.PI * 2);
        
        // สร้าง Gradient บนวงแหวนเพื่อให้เกิดความสวยงาม
        const ringGradient = ctx.createLinearGradient(-circleRadius, 0, circleRadius, 0);
        ringGradient.addColorStop(0, colorPrimary);       // ม่วงเข้ม
        ringGradient.addColorStop(0.5, 'rgba(255, 204, 0, 0.5)'); // เหลืองโปร่งแสง
        ringGradient.addColorStop(1, colorPrimary);
        
        ctx.strokeStyle = ringGradient;
        ctx.lineWidth = 4;
        ctx.stroke();

        // **เพิ่มจุดแสงบนวงแหวนเพื่อให้เห็นการหมุนชัดเจน**
        const numDots = 6;
        for (let i = 0; i < numDots; i++) {
            const angle = (i / numDots) * (Math.PI * 2);
            const x = Math.cos(angle) * circleRadius;
            const y = Math.sin(angle) * circleRadius;
            
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = colorSecondary;
            ctx.fill();
        }

        // คืนสถานะที่บันทึกไว้ (หยุดการหมุนสำหรับเฟรมถัดไป)
        ctx.restore(); 

        frame++;
        requestAnimationFrame(animate); 
    }

    animate();
});