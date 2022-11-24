// 1.render song
// 2.srcoll top 
// 3.play/pause/seek
// 4. Cd rotate
// 5.pre/next
// 6.ramdom
// 7.next/repert when end
// 8.active song
// 9. scroll active song into view
// 10. play song when click

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const audio = $('audio')
const cdImg = $('.cd img');
const cd = $('.cd') 
const playingTitle = $('.playing-title')
const playingAuthor = $('.playing-author')
const playBtn = $('.play-song')
const pauseBtn = $('.pause-song')
const seekLine = $('.progress')
const nextBtn = $('.next-song')
const preBtn = $('.pre-song')
const ramdomBtn = $('.ramdom-song')
const repeatBtn = $('.reload')
const playList = $('.play-list')
const USER_STORE_DATA = 'lUU'

const app = {
    songs: [
        {
            name: 'Anh nhà ở đâu thế',
            singer: 'Amee & B Ray',
            path: './assest/img/maxresdefault (11).jpg',
            linkAudio: './assest/music/y2meta.com - AMEE x B RAY - ANH NHÀ Ở ĐÂU THẾ _ Official Music Video (256 kbps).mp3'
        },
        {
            name: 'Anh đánh rơi người yêu này',
            singer: 'Andiez ft.Amee',
            path: './assest/img/maxresdefault (3).jpg',
            linkAudio: './assest/music/song-11.mp3'
        },
        {
            name: 'Anh là ai',
            singer: 'Phương Ly',
            path: './assest/img/maxresdefault (4).jpg',
            linkAudio: './assest/music/y2meta.com - Anh Là Ai - Phương Ly _ Official Music Video (256 kbps).mp3'
        },
        {
            name: 'Đi theo bóng măt trời',
            singer: 'Đen',
            path: './assest/img/maxresdefault (11).jpg',
            linkAudio: './assest/music/y2meta.com - Đen - Đi Theo Bóng Mặt Trời ft. Tăng Ngân Hà, Maius Philharmonic (256 kbps).mp3'
        },
        {
            name: 'Đưa nhau đi trốn',
            singer: 'Đen',
            path: './assest/img/maxresdefault (10).jpg',
            linkAudio: './assest/music/y2meta.com - Đen - Đưa Nhau Đi Trốn ft. Linh Cáo [M_V] (256 kbps).mp3'
        },
        {
            name: 'Mang tiền về cho mẹ',
            singer: 'Đen',
            path: './assest/img/maxresdefault (6).jpg',
            linkAudio: './assest/music/y2meta.com - Đen - Mang Tiền Về Cho Mẹ ft. Nguyên Thảo (M_V) (256 kbps).mp3'
        },
        {
            name: 'Đếm cừu',
            singer: 'Han Sara',
            path: './assest/img/maxresdefault (2).jpg',
            linkAudio: './assest/music/y2meta.com - HAN SARA - Đếm cừu ft. Kay Trần _ Official MV (256 kbps).mp3'
        },
        {
            name: 'Nơi ta chờ em',
            singer: 'Will ft.Katty ',
            path: './assest/img/maxresdefault.jpg',
            linkAudio: './assest/music/y2meta.com - NƠI TA CHỜ EM (OFFICIAL MV 4K) _ WILL FT KAITY _ 1ST SINGLE - EM CHƯA 18 OST (256 kbps).mp3'
        },
        {
            name: 'Muộn rồi mà sao còn',
            singer: 'Sơn tùng MTP',
            path: './assest/img/maxresdefault (1).jpg',
            linkAudio: './assest/music/y2meta.com - SƠN TÙNG M-TP _ MUỘN RỒI MÀ SAO CÒN _ OFFICIAL MUSIC VIDEO (256 kbps).mp3'
        },
        {
            name: 'Thằng Điên',
            singer: 'Justatee x Phương Ly',
            path: './assest/img/maxresdefault (5).jpg',
            linkAudio: './assest/music/y2meta.com - THẰNG ĐIÊN _ JUSTATEE x PHƯƠNG LY _ OFFICIAL MV (256 kbps).mp3'
        },
        {
            name: 'Vì mẹ anh bắt chia tay',
            singer: 'Miu Lê x Karik x Châu Đăng Khoa',
            path: './assest/img/maxresdefault (9).jpg',
            linkAudio: './assest/music/y2meta.com - VÌ MẸ ANH BẮT CHIA TAY _ MIU LÊ x KARIK x CHÂU ĐĂNG KHOA _ Official MV (256 kbps).mp3'
        },
        {
            name: 'Lemon',
            singer: 'Kenshi Yonezu',
            path: './assest/img/maxresdefault (8).jpg',
            linkAudio: './assest/music/y2meta.com - Đen - Đưa Nhau Đi Trốn ft. Linh Cáo [M_V] (256 kbps).mp3'
        },
    ],

    currentIndex : 0,
    isPlaying: false,
    isRamdom: false,
    isRepeat: false,
    UserSetting: JSON.parse(localStorage.getItem(USER_STORE_DATA)) || {},
    getUserSetting: function(key , value) {
        this.UserSetting[key] = value;
        localStorage.setItem(USER_STORE_DATA, JSON.stringify(this.UserSetting))
    },
    cdRotate: cd.animate(
        [
            {
                transform: 'rotate(0)'
            },
            {
                transform: 'rotate(359deg)'
            }
        ],
        {
            duration:10000,
            iterations: Infinity
        }
    ),    
    render: function() {
        const _this = this;
        const htmls = this.songs.map((song,songIndex) => {
            return ` <div class="play-item ${_this.currentIndex === songIndex? 'active-song':''}" data-index="${songIndex}" >
            <img src="${song.path}" alt="" srcset="">
            <div class="play-item-info">
                <span class="play-item-name">
                    ${song.name}
                </span>
                <span class="play-item-singer">
                    ${song.singer}
                </span>
            </div>
        </div>`
        })

        $('.play-list').innerHTML = htmls.join('');
    },

    timeFormat: function(time) {
        const timeFloor = Math.floor(time);
        const minutes = Math.floor(timeFloor/60)
        const seconds = timeFloor - minutes*60
        return `${minutes >= 10? minutes : '0'+minutes}:${seconds >= 10 ? seconds : '0'+seconds}`
    },
    handleEvents: function() {
        const _this = this
        // xử lí phóng to thu nhỏ
        // const cdHeight = cd.offsetHeight;
        const cdWidth = cdImg.offsetWidth;

        document.onscroll = function() {
            const scrollTop = window.scrollY;
            const newCdWidth = cdWidth - scrollTop;
            if( newCdWidth > 0) {
                cdImg.style.height = newCdWidth +'px';
                cdImg.style.width = newCdWidth +'px';
                cdImg.style.opacity = newCdWidth / cdWidth  ;
            }
            else {
                cdImg.style.height = 0 +'px';
                cdImg.style.width = 0 +'px';
                cdImg.style.opacity = 0  ;
            }
        }

        // xử lí play/pasue
        playBtn.onclick = function() {
            if(!_this.isPlaying) {
                audio.play()
            }
            else{
                audio.pause()
            }
        }

        audio.onplay = function() {
            _this.isPlaying = true;
            playBtn.innerHTML = `<i class="fas fa-pause"></i>`
            _this.cdRotate.play()
        }

        audio.onpause = function() {
            _this.isPlaying = false;
            playBtn.innerHTML = `<i class="fas fa-play"></i>`
            _this.cdRotate.pause()
        }

        // xử lí seek 
        audio.ontimeupdate = function() {
            const timeRight =  $('.control-time-right')
            const timeLeft = $('.control-time-left')

            if(audio.currentTime / audio.duration) {
                seekLine.value = audio.currentTime / audio.duration * 100;
                timeLeft.textContent = _this.timeFormat(audio.currentTime)
                timeRight.textContent =  _this.timeFormat(audio.duration)
            }
        }

        seekLine.onclick = function() {
            audio.currentTime = audio.duration * this.value / 100
        }

        // xử lí next song 
        nextBtn.onclick = function() {
           _this.nextSong()
           audio.play()
           _this.render()
        }

        preBtn.onclick = function() {
            _this.preSong()
            audio.play()
            _this.render()
        }

        // xử lí ramdom song
        ramdomBtn.onclick = function() {
            _this.isRamdom = !_this.isRamdom
            _this.getUserSetting('isRamdom', _this.isRamdom)
            ramdomBtn.classList.toggle("active")
        }

        // xu li khi end
        audio.onended = function() {
            if(_this.isRepeat) {
                playBtn.onclick()
            }
            else {
                _this.nextSong()
                audio.play()
            }
        }

        // xu li repeat 
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            _this.getUserSetting('isRepeat', _this.isRepeat)
            this.classList.toggle("active")
        }

        // xu li chon bai hat
        playList.onclick = function(e) {
            const songNode = e.target.closest(".play-item")
            if(songNode) {
                _this.currentIndex = Number(songNode.dataset.index)
                _this.loadCurrentSong()
                _this.render()
                audio.play()
            }
        }

    },


    defineProperties: function() {
        Object.defineProperty( this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },

    nextSong: function() {
        if(this.isRamdom) {
            this.ramdomSong()
        }
        else {
            this.currentIndex++
            if(this.currentIndex >= this.songs.length ) {
                this.currentIndex = 0
            }  
        }
        this.loadCurrentSong()
    },

    preSong: function() {
       if(this.isRamdom) {
        this.ramdomSong()
       }
       else {
            this.currentIndex--
            if(this.currentIndex <= 0 ) {
                this.currentIndex = this.songs.length
            }  
       }
        this.loadCurrentSong()
    },

    ramdomSong: function() {
        let ramdomIndex;
        do{
            ramdomIndex = Math.floor(Math.random() * this.songs.length);

        }while(this.currentIndex === ramdomIndex)

        this.currentIndex = ramdomIndex
        // console.log(this.currentIndex)
        // this.loadCurrentSong()
    },
    loadSetting: function() {
        this.isRamdom = this.UserSetting.isRamdom
        if(this.isRamdom) {
            ramdomBtn.classList.toggle("active")
        }
        this.isRepeat = this.UserSetting.isRepeat
        if(this.isRepeat) {
            repeatBtn.classList.toggle("active")
        }
    },
    loadCurrentSong: function() {
        playingAuthor.textContent = this.currentSong.name
        cdImg.src = this.currentSong.path
        audio.src = this.currentSong.linkAudio
        this.cdRotate.pause()
        if(!playList.isScrolled) {
            setTimeout(() => {
               $$('.play-item')[this.currentIndex].scrollIntoView({
                  behavior: "smooth",
                  block: "center"
               });
            }, 200);

            this.isScrolled = true;
         }
        
    },
   
    start: function() {
        this.loadSetting()
        this.defineProperties()
        this.handleEvents() 
        this.loadCurrentSong()
        this.render()
        
    }
}

app.start()