import {Howl, Howler} from 'howler'

export const playAudios = (src1, src2, src3) => {
    const audio1 = new Howl({src: [src1]})
    const audio2 = new Howl({src: [src2]})
    const audio3 = new Howl({src: [src3]})
    Howler.stop()
    audio1.play()
    audio1.on('end', function () {
        audio2.play()
        audio2.on('end', function () {
            audio3.play()
        })
    })
}
