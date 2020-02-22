package com.mo.ToolClass.Audio;



import java.io.File;
import java.io.IOException;

import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.UnsupportedAudioFileException;
/**
 * 实现音频文件压缩
 * @author Mr.DAI
 *
 */
public class SampleRateConversion {
	
	public SampleRateConversion() {
		
	}

	/**
	 * 音频压缩
	 * @param InputFile   需要压缩的文件位置
	 * @param OutputFile  压缩后的位置
	 */
	public SampleRateConversion(String InputFile, String OutputFile) {
		File inputFile = new File(InputFile);
		File outputFile = new File(OutputFile);
		AudioInputStream stream = null;
		// TODO Auto-generated constructor stub
		try {
			stream = AudioSystem.getAudioInputStream(inputFile);

//			stream = convertSampleRate(20000.0f, stream);
			
			stream = convertSampleRate(16, stream);

			AudioSystem.write(stream, AudioFileFormat.Type.WAVE, outputFile);

		} catch (UnsupportedAudioFileException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private AudioInputStream convertSampleRate(int fSampleRate, AudioInputStream sourceStream) {
//		AudioFormat sourceFormat = sourceStream.getFormat();
//		AudioFormat targetFormat = new AudioFormat(
//				sourceFormat.getEncoding(), 
//				fSampleRate,
//				sourceFormat.getSampleSizeInBits(), 
//				sourceFormat.getChannels(), 
//				sourceFormat.getFrameSize(),
//				fSampleRate, 
//				sourceFormat.isBigEndian());
		
		
		AudioFormat format = sourceStream.getFormat();
		AudioFormat targetFormat=new AudioFormat(
		          AudioFormat.Encoding.PCM_SIGNED,
		          format.getSampleRate(),
		          16,
		          format.getChannels(),
		          format.getChannels() * 2,
		          format.getSampleRate(),
		          false);
		return AudioSystem.getAudioInputStream(format, sourceStream);
	}
	
	public static void main(String args[]) {
		new SampleRateConversion("C:\\Users\\Administrator\\Desktop\\Earthquake.mp3", "C:\\Users\\Administrator\\Desktop\\4.mp3");
	}
}
