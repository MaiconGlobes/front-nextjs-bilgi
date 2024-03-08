import dynamic from 'next/dynamic';
const ReactApexcharts = dynamic(() => import('react-apexcharts'), { ssr: true })

export default ReactApexcharts
