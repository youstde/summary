import { Button, DatePicker, Radio } from 'antd';

export default function Home() {
    return (
        <div className=" w-screen h-screen flex justify-center items-center bg-gray-50">
            <div className=' text-white'>index home</div>
            <Button type='primary'>click</Button>
            <DatePicker></DatePicker>
            <Radio.Group>
                <Radio value={1}>A</Radio>
                <Radio value={2}>B</Radio>
                <Radio value={3}>C</Radio>
                <Radio value={4}>D</Radio>
            </Radio.Group>
        </div>
    )
}
