#!/usr/bin/env python3
"""
主题配置模块
定义各种演示文稿主题的配色、字体和样式
"""

from typing import Dict, Any
from pptx.dml.color import RGBColor


class Theme:
    """主题基类"""
    
    def __init__(self, name: str, config: Dict[str, Any]):
        self.name = name
        self.background_color = config.get('background_color', '#FFFFFF')
        self.primary_color = config.get('primary_color', '#000000')
        self.text_color = config.get('text_color', '#000000')
        self.accent_color = config.get('accent_color', '#666666')
        self.font_title = config.get('font_title', 'Arial')
        self.font_body = config.get('font_body', 'Arial')
        self.description = config.get('description', '')
    
    def get_bg_rgb(self) -> RGBColor:
        """获取背景色 RGB"""
        return self._hex_to_rgb(self.background_color)
    
    def get_primary_rgb(self) -> RGBColor:
        """获取主色调 RGB"""
        return self._hex_to_rgb(self.primary_color)
    
    def get_text_rgb(self) -> RGBColor:
        """获取文字色 RGB"""
        return self._hex_to_rgb(self.text_color)
    
    def get_accent_rgb(self) -> RGBColor:
        """获取强调色 RGB"""
        return self._hex_to_rgb(self.accent_color)
    
    @staticmethod
    def _hex_to_rgb(hex_color: str) -> RGBColor:
        """将十六进制颜色转换为 RGB"""
        hex_color = hex_color.lstrip('#')
        r = int(hex_color[0:2], 16)
        g = int(hex_color[2:4], 16)
        b = int(hex_color[4:6], 16)
        return RGBColor(r, g, b)
    
    def get_reveal_css(self) -> str:
        """获取 reveal.js 的 CSS 样式"""
        return f"""
        .reveal {{
            background-color: {self.background_color};
            color: {self.text_color};
            font-family: {self.font_body}, sans-serif;
        }}
        .reveal h1, .reveal h2, .reveal h3 {{
            color: {self.primary_color};
            font-family: {self.font_title}, serif;
            text-transform: none;
        }}
        .reveal a {{
            color: {self.accent_color};
        }}
        .reveal .center {{
            text-align: center;
        }}
        """


# 预定义主题配置
THEMES = {
    'philosophy': {
        'name': 'Philosophy Theme (哲学思辨)',
        'background_color': '#0D0D0D',
        'primary_color': '#D4AF37',
        'text_color': '#FAFAFA',
        'accent_color': '#D4AF37',
        'font_title': 'Noto Serif SC, Noto Serif JP, serif',
        'font_body': 'Noto Serif SC, Noto Serif JP, serif',
        'description': '适用于哲学思考、智慧分享、文化传承类内容'
    },
    
    'business': {
        'name': 'Business Theme (商务简约)',
        'background_color': '#FFFFFF',
        'primary_color': '#2196F3',
        'text_color': '#333333',
        'accent_color': '#0D47A1',
        'font_title': 'Arial, Helvetica, Microsoft YaHei, sans-serif',
        'font_body': 'Arial, Helvetica, Microsoft YaHei, sans-serif',
        'description': '适用于商业汇报、企业介绍、项目展示'
    },
    
    'minimal': {
        'name': 'Minimal Theme (极简风格)',
        'background_color': '#FFFFFF',
        'primary_color': '#000000',
        'text_color': '#000000',
        'accent_color': '#666666',
        'font_title': 'Helvetica Neue, Arial, sans-serif',
        'font_body': 'Helvetica Neue, Arial, sans-serif',
        'description': '适用于学术报告、技术分享、代码演示'
    },
    
    'traditional': {
        'name': 'Traditional Theme (传统文化)',
        'background_color': '#FAF8F5',
        'primary_color': '#C41E3A',
        'text_color': '#1A1A1A',
        'accent_color': '#C41E3A',
        'font_title': 'FangSong, SimSun, Noto Serif SC, serif',
        'font_body': 'FangSong, SimSun, Noto Serif SC, serif',
        'description': '适用于国学经典、诗词鉴赏、文化课程'
    },
    
    'dark': {
        'name': 'Dark Theme (暗黑模式)',
        'background_color': '#1C1C1C',
        'primary_color': '#00BCD4',
        'text_color': '#E0E0E0',
        'accent_color': '#00BCD4',
        'font_title': 'Roboto, Microsoft YaHei, sans-serif',
        'font_body': 'Roboto, Microsoft YaHei, sans-serif',
        'description': '适用于技术演示、夜间演讲、视觉舒适'
    },
    
    # 默认主题（向后兼容）
    'default': {
        'name': 'Default Theme (默认主题)',
        'background_color': '#1C1C1C',
        'primary_color': '#FFFFFF',
        'text_color': '#FFFFFF',
        'accent_color': '#CCCCCC',
        'font_title': 'Arial, sans-serif',
        'font_body': 'Arial, sans-serif',
        'description': '默认深色主题'
    }
}


def get_theme(theme_name: str = 'default') -> Theme:
    """
    获取主题对象
    
    Args:
        theme_name: 主题名称
        
    Returns:
        Theme 对象
    """
    if theme_name not in THEMES:
        print(f"警告: 主题 '{theme_name}' 不存在，使用默认主题")
        theme_name = 'default'
    
    return Theme(theme_name, THEMES[theme_name])


def list_themes() -> None:
    """列出所有可用主题"""
    print("可用主题:\n")
    for name, config in THEMES.items():
        if name != 'default':
            print(f"  {name:15} - {config['name']}")
            print(f"  {'':15}   {config['description']}")
            print()


def create_custom_theme(
    name: str,
    background_color: str,
    primary_color: str,
    text_color: str,
    accent_color: str = None,
    font_title: str = 'Arial',
    font_body: str = 'Arial'
) -> Theme:
    """
    创建自定义主题
    
    Args:
        name: 主题名称
        background_color: 背景色（十六进制）
        primary_color: 主色调（十六进制）
        text_color: 文字色（十六进制）
        accent_color: 强调色（十六进制，可选）
        font_title: 标题字体
        font_body: 正文字体
        
    Returns:
        Theme 对象
    """
    if accent_color is None:
        accent_color = primary_color
    
    config = {
        'name': name,
        'background_color': background_color,
        'primary_color': primary_color,
        'text_color': text_color,
        'accent_color': accent_color,
        'font_title': font_title,
        'font_body': font_body,
        'description': '自定义主题'
    }
    
    return Theme(name, config)


if __name__ == '__main__':
    # 测试：列出所有主题
    list_themes()
    
    # 测试：获取主题
    philosophy_theme = get_theme('philosophy')
    print(f"\n哲学主题:")
    print(f"  背景色: {philosophy_theme.background_color}")
    print(f"  主色调: {philosophy_theme.primary_color}")
    print(f"  文字色: {philosophy_theme.text_color}")
    
    # 测试：创建自定义主题
    custom = create_custom_theme(
        name='my-theme',
        background_color='#FFFFFF',
        primary_color='#FF5722',
        text_color='#212121'
    )
    print(f"\n自定义主题:")
    print(f"  背景色: {custom.background_color}")
    print(f"  主色调: {custom.primary_color}")
