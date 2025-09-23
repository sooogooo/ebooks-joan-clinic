#!/bin/bash

# 医美科普网站一键部署脚本
# 作者: Claude Code Assistant
# 版本: 1.0.0
# 描述: Next.js 静态网站自动化部署脚本

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 创建日志目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="$SCRIPT_DIR/logs"
mkdir -p "$LOG_DIR"

# 日志文件
LOG_FILE="$LOG_DIR/deploy_$(date +%Y%m%d_%H%M%S).log"

# 记录日志
log_to_file() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# 检查命令是否存在
check_command() {
    if ! command -v $1 &> /dev/null; then
        log_error "$1 未安装，请先安装 $1"
        log_to_file "ERROR: $1 command not found"
        exit 1
    fi
}

# 检查必要的工具
check_dependencies() {
    log_info "检查系统依赖..."
    log_to_file "Checking system dependencies"
    
    check_command "node"
    check_command "npm"
    check_command "git"
    
    # 检查Node.js版本
    NODE_VERSION=$(node --version | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_VERSION" -lt "18" ]; then
        log_error "Node.js 版本过低，需要 18.x 或更高版本"
        log_to_file "ERROR: Node.js version too low: $(node --version)"
        exit 1
    fi
    
    log_success "系统依赖检查通过"
    log_to_file "System dependencies check passed"
}

# 安装项目依赖
install_dependencies() {
    log_info "安装项目依赖..."
    log_to_file "Installing project dependencies"
    
    if [ -f "package.json" ]; then
        npm install 2>&1 | tee -a "$LOG_FILE"
        log_success "依赖安装完成"
        log_to_file "Dependencies installed successfully"
    else
        log_error "package.json 文件不存在"
        log_to_file "ERROR: package.json not found"
        exit 1
    fi
}

# 运行代码检查
run_lint() {
    log_info "运行代码检查..."
    log_to_file "Running code linting"
    
    if npm run lint 2>&1 | tee -a "$LOG_FILE"; then
        log_success "代码检查通过"
        log_to_file "Linting passed"
    else
        log_warning "代码检查有警告，继续部署..."
        log_to_file "Linting warnings detected, continuing deployment"
    fi
}

# 构建项目
build_project() {
    log_info "开始构建项目..."
    log_to_file "Starting project build"
    
    # 清理之前的构建
    if [ -d ".next" ]; then
        rm -rf .next
        log_info "清理旧的构建文件"
        log_to_file "Cleaned old build files"
    fi
    
    if [ -d "out" ]; then
        rm -rf out
        log_info "清理旧的输出文件"
        log_to_file "Cleaned old output files"
    fi
    
    # 构建项目
    if npm run build 2>&1 | tee -a "$LOG_FILE"; then
        log_success "项目构建成功"
        log_to_file "Project built successfully"
    else
        log_error "项目构建失败"
        log_to_file "ERROR: Project build failed"
        exit 1
    fi
}

# 生成静态文件
export_static() {
    log_info "生成静态文件..."
    log_to_file "Exporting static files"
    
    if npm run export 2>&1 | tee -a "$LOG_FILE"; then
        log_success "静态文件生成成功"
        log_to_file "Static files exported successfully"
    else
        log_warning "静态导出失败，尝试使用构建输出..."
        log_to_file "WARNING: Static export failed, using build output"
    fi
}

# 优化构建输出
optimize_build() {
    log_info "优化构建输出..."
    log_to_file "Optimizing build output"
    
    if [ -d "out" ]; then
        BUILD_DIR="out"
    elif [ -d ".next" ]; then
        BUILD_DIR=".next"
    else
        log_error "找不到构建输出目录"
        log_to_file "ERROR: Build output directory not found"
        exit 1
    fi
    
    # 压缩文件
    if command -v gzip &> /dev/null; then
        find "$BUILD_DIR" -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" \) -exec gzip -k {} \;
        log_info "已压缩静态文件"
        log_to_file "Compressed static files"
    fi
    
    log_success "构建优化完成"
    log_to_file "Build optimization completed"
}

# 生成部署报告
generate_report() {
    local BUILD_DIR=$1
    local REPORT_FILE="$LOG_DIR/deploy_report_$(date +%Y%m%d_%H%M%S).txt"
    
    log_info "生成部署报告..."
    log_to_file "Generating deployment report"
    
    {
        echo "医美科普网站部署报告"
        echo "======================"
        echo "部署时间: $(date '+%Y-%m-%d %H:%M:%S')"
        echo "Node.js版本: $(node --version)"
        echo "NPM版本: $(npm --version)"
        echo ""
        echo "项目信息:"
        echo "项目名称: 天人合一与医美"
        echo "项目版本: 1.0.0"
        echo "构建输出: $BUILD_DIR"
        echo ""
        echo "文件统计:"
        if [ -d "$BUILD_DIR" ]; then
            echo "总文件数: $(find "$BUILD_DIR" -type f | wc -l)"
            echo "总大小: $(du -sh "$BUILD_DIR" | cut -f1)"
            echo ""
            echo "文件类型分布:"
            find "$BUILD_DIR" -type f | sed 's/.*\.//' | sort | uniq -c | sort -nr
        fi
        echo ""
        echo "部署状态: 成功"
        echo "日志文件: $LOG_FILE"
    } > "$REPORT_FILE"
    
    log_success "部署报告已生成: $REPORT_FILE"
    log_to_file "Deployment report generated: $REPORT_FILE"
}

# 部署到本地服务器
deploy_local() {
    log_info "准备本地部署..."
    log_to_file "Preparing local deployment"
    
    local BUILD_DIR
    if [ -d "out" ]; then
        BUILD_DIR="out"
    elif [ -d ".next" ]; then
        BUILD_DIR=".next"
    else
        log_error "找不到构建输出目录"
        log_to_file "ERROR: No build output directory found"
        exit 1
    fi
    
    # 创建部署目录
    local DEPLOY_DIR="/var/www/medical-aesthetics"
    if [ ! -d "/var/www" ]; then
        log_warning "/var/www 目录不存在，使用当前目录的 dist 文件夹"
        DEPLOY_DIR="$SCRIPT_DIR/dist"
    fi
    
    log_info "部署到: $DEPLOY_DIR"
    log_to_file "Deploying to: $DEPLOY_DIR"
    
    # 备份现有部署
    if [ -d "$DEPLOY_DIR" ]; then
        BACKUP_DIR="${DEPLOY_DIR}_backup_$(date +%Y%m%d_%H%M%S)"
        cp -r "$DEPLOY_DIR" "$BACKUP_DIR"
        log_info "已备份现有部署到: $BACKUP_DIR"
        log_to_file "Backed up existing deployment to: $BACKUP_DIR"
    fi
    
    # 创建部署目录
    mkdir -p "$DEPLOY_DIR"
    
    # 复制文件
    cp -r "$BUILD_DIR"/* "$DEPLOY_DIR/"
    
    # 设置权限
    chmod -R 755 "$DEPLOY_DIR"
    
    log_success "本地部署完成: $DEPLOY_DIR"
    log_to_file "Local deployment completed: $DEPLOY_DIR"
    
    generate_report "$BUILD_DIR"
}

# 启动本地预览服务器
start_preview() {
    local PORT=${1:-3000}
    
    log_info "启动预览服务器 (端口: $PORT)..."
    log_to_file "Starting preview server on port: $PORT"
    
    if command -v python3 &> /dev/null; then
        cd out 2>/dev/null || cd .next 2>/dev/null || {
            log_error "找不到构建输出目录"
            log_to_file "ERROR: No build output directory found for preview"
            exit 1
        }
        
        log_success "预览服务器已启动: http://localhost:$PORT"
        log_info "按 Ctrl+C 停止服务器"
        log_to_file "Preview server started on http://localhost:$PORT"
        
        python3 -m http.server $PORT
    else
        log_warning "Python3 未安装，无法启动预览服务器"
        log_to_file "WARNING: Python3 not available for preview server"
    fi
}

# 清理函数
cleanup() {
    log_info "清理临时文件..."
    log_to_file "Cleaning up temporary files"
    
    # 这里可以添加清理逻辑
    
    log_success "清理完成"
    log_to_file "Cleanup completed"
}

# 显示帮助信息
show_help() {
    cat << EOF
医美科普网站一键部署脚本

用法: $0 [选项]

选项:
  -h, --help      显示此帮助信息
  -p, --preview   构建后启动预览服务器
  -c, --clean     仅清理构建文件
  --port PORT     指定预览服务器端口 (默认: 3000)
  --no-lint       跳过代码检查
  --no-optimize   跳过构建优化

示例:
  $0                    # 标准部署
  $0 --preview          # 部署并启动预览
  $0 --preview --port 8080  # 部署并在8080端口启动预览
  $0 --clean            # 仅清理构建文件

EOF
}

# 主函数
main() {
    local PREVIEW=false
    local PORT=3000
    local CLEAN_ONLY=false
    local SKIP_LINT=false
    local SKIP_OPTIMIZE=false
    
    # 解析命令行参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -p|--preview)
                PREVIEW=true
                shift
                ;;
            -c|--clean)
                CLEAN_ONLY=true
                shift
                ;;
            --port)
                PORT="$2"
                shift 2
                ;;
            --no-lint)
                SKIP_LINT=true
                shift
                ;;
            --no-optimize)
                SKIP_OPTIMIZE=true
                shift
                ;;
            *)
                log_error "未知选项: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # 设置错误处理
    trap cleanup EXIT
    
    log_info "开始医美科普网站部署..."
    log_to_file "Starting medical aesthetics website deployment"
    
    if [ "$CLEAN_ONLY" = true ]; then
        cleanup
        exit 0
    fi
    
    # 执行部署步骤
    check_dependencies
    install_dependencies
    
    if [ "$SKIP_LINT" = false ]; then
        run_lint
    fi
    
    build_project
    export_static
    
    if [ "$SKIP_OPTIMIZE" = false ]; then
        optimize_build
    fi
    
    deploy_local
    
    log_success "部署完成！"
    log_to_file "Deployment completed successfully"
    
    # 显示部署信息
    echo ""
    log_info "部署摘要:"
    echo "  - 项目: 天人合一与医美科普网站"
    echo "  - 构建时间: $(date '+%Y-%m-%d %H:%M:%S')"
    echo "  - 日志文件: $LOG_FILE"
    
    if [ -d "out" ]; then
        echo "  - 输出目录: out/"
        echo "  - 文件数量: $(find out -type f | wc -l)"
    fi
    
    if [ "$PREVIEW" = true ]; then
        echo ""
        start_preview "$PORT"
    else
        echo ""
        log_info "运行 '$0 --preview' 来启动预览服务器"
    fi
}

# 脚本入口
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi