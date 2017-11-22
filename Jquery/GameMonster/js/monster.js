function Monster(avatar, size, x, y, directionX, directionY, reverse) {
	/* Hình ảnh đại diện */
	this.avatar = avatar;
	
	/* Kích thước */
	this.size = size;
	
	/* Vị trí xuất phát */
	this.startX = x;
	this.startY = y;
	
	/* Vị trí hiện tại */
	this.currentX = this.startX;
	this.currentY = this.startY;
	
	/* Hướng di chuyển */
	this.directionX = directionX;
	this.directionY = directionY;
	
	/* Số lần đảo hướng */
	this.reverse = reverse;
	
	/* Check tồn tại */
	this.exist = true;
}

Monster.prototype.update = function(speed, distance, layout) {
	
	/* Ra khỏi vùng kiểm soát = chết */
	if (this.currentX + this.size < 0 || this.currentX > layout.width ||
			this.currentY + this.size < 0 || this.currentY > layout.height) {
		this.exist = false
		return;
	}
	
	/* Nếu còn đảo hướng */
	if (this.reverse > 0) {
		if (Math.abs(this.currentX - this.startX) >= Math.abs(this.directionX * distance) &&
				Math.abs(this.currentY - this.startY) >= Math.abs(this.directionY * distance)) {
			
			/* Đặt lại điểm xuất phát */
			this.startX = this.currentX;
			this.startY = this.currentY;
			
			/* Đặt lại hướng di chuyển */
			this.directionX = -this.directionX;
			this.directionY = -this.directionY;
			
			/* Giảm số lần đảo hướng */
			this.reverse--;
		}
	}
	
	/* Di chuyển */
	this.currentX += this.directionX * speed;
	this.currentY += this.directionY * speed;
}